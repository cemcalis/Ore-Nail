const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

// Get booked dates (public - for booking page calendar)
exports.getBookedDates = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: { $in: ['pending', 'confirmed'] }
    }).maxTimeMS(5000);

    const bookedDates = appointments.map(apt => {
      const date = new Date(apt.appointmentDate);
      return date.toISOString().split('T')[0];
    });

    res.json({ bookedDates: [...new Set(bookedDates)] });
  } catch (error) {
    console.error('Booked dates error:', error.message);
    // MongoDB connection error - return empty array
    if (error.message.includes('buffering timed out') || error.message.includes('connect ECONNREFUSED')) {
      return res.json({ bookedDates: [] });
    }
    res.status(500).json({ message: 'Error fetching booked dates', error: error.message });
  }
};

// Get all appointments (for admin)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email phone')
      .populate('serviceId', 'name price duration')
      .sort({ appointmentDate: 1 })
      .maxTimeMS(5000);

    res.json(appointments);
  } catch (error) {
    console.error('Appointments error:', error.message);
    // MongoDB connection error - return empty array with message
    if (error.message.includes('buffering timed out') || error.message.includes('connect ECONNREFUSED')) {
      return res.json([]);
    }
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Get user appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.userId })
      .populate('serviceId', 'name price duration')
      .sort({ appointmentDate: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Create appointment - no authentication required
exports.createAppointment = async (req, res) => {
  try {
    const { serviceId, appointmentDate, startTime, notes, customerName, customerEmail, customerPhone } = req.body;

    // Validate customer info
    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ message: 'Customer name, email, and phone are required' });
    }

    // Validate service exists
    let service;
    try {
      service = await Service.findById(serviceId).maxTimeMS(3000);
    } catch (err) {
      // MongoDB offline - try to find in demoServices
      const { demoServices } = require('./serviceController');
      if (demoServices) {
        service = demoServices.find(s => s._id === serviceId);
      }

      if (!service) {
        return res.status(503).json({ message: 'Service database temporarily unavailable' });
      }
    }

    if (!service) {
      // One last check in demoServices if it was a 404 from DB but we are in demo mode
      const { demoServices } = require('./serviceController');
      service = demoServices?.find(s => s._id === serviceId);

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
    }

    // Calculate end time based on service duration
    const [hours, minutes] = startTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(hours, minutes + service.duration);
    const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(
      endDate.getMinutes()
    ).padStart(2, '0')}`;

    // Check for conflicting appointments
    let conflict;
    try {
      conflict = await Appointment.findOne({
        appointmentDate: new Date(appointmentDate),
        status: { $ne: 'cancelled' },
        $or: [
          {
            startTime: { $lt: endTime },
            endTime: { $gt: startTime },
          },
        ],
      }).maxTimeMS(5000);
    } catch (err) {
      // In demo mode, assume no conflicts
      conflict = null;
    }

    if (conflict) {
      return res.status(409).json({ message: 'Time slot already booked' });
    }

    // In-memory appointments for demo mode
    if (!global.demoAppointments) global.demoAppointments = [];

    let appointment;
    try {
      appointment = new Appointment({
        customerName,
        customerEmail,
        customerPhone,
        serviceId,
        appointmentDate: new Date(appointmentDate),
        startTime,
        endTime,
        totalPrice: service.price,
        notes,
      });

      await appointment.save();
      await appointment.populate('serviceId', 'name price duration');
    } catch (saveError) {
      console.warn('MongoDB offline - saving appointment to memory');
      const demoApt = {
        _id: 'demo_' + Date.now(),
        customerName,
        customerEmail,
        customerPhone,
        serviceId: service, // Nest the service object directly for demo
        appointmentDate: new Date(appointmentDate),
        startTime,
        endTime,
        totalPrice: service.price,
        notes,
        status: 'pending'
      };
      global.demoAppointments.push(demoApt);
      return res.status(201).json({
        message: 'Appointment created (demo mode)',
        appointment: demoApt,
      });
    }

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment,
    });
  } catch (error) {
    console.error('Final Appointment error:', error.message);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// Update appointment status (admin)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate('userId', 'name email phone')
      .populate('serviceId', 'name price');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user is the owner or admin
    if (appointment.userId.toString() !== req.userId && !req.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({ message: 'Appointment cancelled', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
  }
};

// Get available time slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.status(400).json({ message: 'Service ID and date are required' });
    }

    let service;
    try {
      service = await Service.findById(serviceId).maxTimeMS(5000);
    } catch (err) {
      // Demo mode - create mock service
      service = { duration: 30 };
    }

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    let appointments = [];
    try {
      appointments = await Appointment.find({
        serviceId,
        appointmentDate: {
          $gte: new Date(date),
          $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
        },
        status: { $ne: 'cancelled' },
      }).maxTimeMS(5000);
    } catch (err) {
      // Demo mode - return all slots available
      appointments = [];
    }

    const bookedSlots = appointments.map((apt) => ({
      start: apt.startTime,
      end: apt.endTime,
    }));

    // Generate available slots (9 AM to 7 PM, 15-minute intervals for flexibility)
    const availableSlots = [];
    const startHour = 9;
    const endHour = 19; // Expanded hours to 7 PM

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const slotTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        // Calculate slot end time based on the SELECTED service's duration
        const totalMinutes = hour * 60 + minute + service.duration;
        const slotEndHour = Math.floor(totalMinutes / 60);
        const slotEndMinute = totalMinutes % 60;
        const slotEnd = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`;

        // Stop if the appointment would end after closing time
        if (slotEndHour > endHour || (slotEndHour === endHour && slotEndMinute > 0)) {
          continue;
        }

        // Check if slot conflicts with booked appointments (of ANY duration)
        const isAvailable = !bookedSlots.some(
          (booked) => {
            // Overlap condition: (s1 < e2) AND (e1 > s2)
            return slotTime < booked.end && slotEnd > booked.start;
          }
        );

        if (isAvailable) {
          availableSlots.push(slotTime);
        }
      }
    }

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots', error: error.message });
  }
};
