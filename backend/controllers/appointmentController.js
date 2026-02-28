const { readData, writeData } = require('../utils/db');

exports.getBookedDates = async (req, res) => {
  const appointments = readData('appointments');
  const bookedDates = appointments
    .filter(apt => ['pending', 'confirmed'].includes(apt.status))
    .map(apt => new Date(apt.appointmentDate).toISOString().split('T')[0]);
  res.json({ bookedDates: [...new Set(bookedDates)] });
};

exports.getAllAppointments = async (req, res) => {
  const appointments = readData('appointments');
  const services = readData('services');

  // Cross-reference serviceId to include service details
  const detailedAppointments = appointments.map(apt => ({
    ...apt,
    serviceId: services.find(s => s._id === apt.serviceId) || { name: 'Unknown' }
  })).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  res.json(detailedAppointments);
};

exports.createAppointment = async (req, res) => {
  const { serviceId, appointmentDate, startTime, notes, customerName, customerEmail, customerPhone } = req.body;
  const services = readData('services');
  const service = services.find(s => s._id === serviceId);

  if (!service) return res.status(404).json({ message: 'Service not found' });

  // Calculate end time
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + service.duration;
  const endTime = `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;

  const appointments = readData('appointments');

  // Conflict check
  const conflict = appointments.find(apt => {
    return apt.appointmentDate === appointmentDate &&
      apt.status !== 'cancelled' &&
      startTime < apt.endTime && endTime > apt.startTime;
  });

  if (conflict) return res.status(409).json({ message: 'Seçilen saatte başka bir randevu bulunmaktadır.' });

  const newAppointment = {
    _id: Date.now().toString(),
    customerName,
    customerEmail,
    customerPhone,
    serviceId,
    appointmentDate,
    startTime,
    endTime,
    totalPrice: service.price,
    notes,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  appointments.push(newAppointment);
  writeData('appointments', appointments);

  res.status(201).json({ message: 'Randevunuz başarıyla oluşturuldu!', appointment: newAppointment });
};

exports.updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  const appointments = readData('appointments');
  const index = appointments.findIndex(a => a._id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Appointment not found' });

  appointments[index].status = status;
  writeData('appointments', appointments);
  res.json({ message: 'Status updated', appointment: appointments[index] });
};

exports.getAvailableSlots = async (req, res) => {
  const { serviceId, date } = req.query;
  const services = readData('services');
  const service = services.find(s => s._id === serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const appointments = readData('appointments');
  const dayBookings = appointments.filter(a => a.appointmentDate === date && a.status !== 'cancelled');

  const availableSlots = [];
  const startHour = 9;
  const endHour = 19;

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const slotTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      const totalMins = hour * 60 + minute + service.duration;
      const slotEnd = `${String(Math.floor(totalMins / 60)).padStart(2, '0')}:${String(totalMins % 60).padStart(2, '0')}`;

      if (totalMins > endHour * 60) continue;

      const isConflict = dayBookings.some(b => slotTime < b.endTime && slotEnd > b.startTime);
      if (!isConflict) availableSlots.push(slotTime);
    }
  }
  res.json({ availableSlots });
};
