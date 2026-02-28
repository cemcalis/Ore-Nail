import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:5555/api' : `${window.location.origin}/api`);

function BookingPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

  // Müşteri bilgileri
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  useEffect(() => {
    fetchServices();
    fetchBookedDates();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setMessage('❌ Hizmetler yüklenemedi');
    }
  };

  const fetchBookedDates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/appointments/booked-dates`);
      setBookedDates(response.data.bookedDates || []);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  const fetchAvailableSlots = async (date) => {
    if (!selectedService || !date) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/appointments/available-slots`, {
        params: {
          serviceId: selectedService,
          date: date,
        },
      });
      setAvailableSlots(response.data.availableSlots);
      setSelectedSlot('');
    } catch (error) {
      console.error('Error fetching slots:', error);
      setMessage('❌ Saatler yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const date = String(day).padStart(2, '0');
    const dateString = `${year}-${month}-${date}`;

    setAppointmentDate(dateString);
    fetchAvailableSlots(dateString);
  };

  const handleServiceChange = (serviceId) => {
    // Her service değiştiğinde fresh veri çek
    fetchServices();
    setSelectedService(serviceId);
    setAppointmentDate('');
    setAvailableSlots([]);
    setSelectedSlot('');
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!customerName || !customerEmail || !customerPhone) {
      setMessage('❌ Lütfen tüm kişisel bilgileri doldurunuz');
      return;
    }

    if (!selectedService || !appointmentDate || !selectedSlot) {
      setMessage('❌ Lütfen hizmet, tarih ve saati seçiniz');
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${API_BASE_URL}/appointments`,
        {
          customerName,
          customerEmail,
          customerPhone,
          serviceId: selectedService,
          appointmentDate,
          startTime: selectedSlot,
          notes,
        }
      );

      setMessage('✓ Randevunuz başarıyla kaydedildi! Kısa sürede onay alacaksınız.');
      // Form'u temizle
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSelectedService(null);
      setAppointmentDate('');
      setSelectedSlot('');
      setNotes('');
      setAvailableSlots([]);
      fetchBookedDates();
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage(error.response?.data?.message || '❌ Randevu kaydı başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  // Takvim fonksiyonları
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const isDateBooked = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const date = String(day).padStart(2, '0');
    const dateString = `${year}-${month}-${date}`;
    return bookedDates.includes(dateString);
  };

  const isDateSelected = (day) => {
    if (!appointmentDate) return false;
    const selectedDate = new Date(appointmentDate);
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isDatePast = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(currentMonth);
    checkDate.setDate(day);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const daysOfWeek = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'];

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>🎀 Randevu Al</h1>

        {message && (
          <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleBookAppointment}>
          {/* KIŞISEL BİLGİLER */}
          <div className="form-section">
            <div className="form-section-title">Kişisel Bilgiler</div>

            <div className="form-group">
              <label>Ad Soyad *</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Adınız ve soyadınız"
                required
              />
            </div>

            <div className="form-group">
              <label>E-mail *</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="E-mail adresiniz"
                required
              />
            </div>

            <div className="form-group">
              <label>Telefon *</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Telefon numaranız"
                required
              />
            </div>
          </div>

          {/* RANDEVU SEÇİMİ */}
          <div className="form-section">
            <div className="form-section-title">Randevu Seçimi</div>

            <div className="form-group">
              <label>Hizmet Seç *</label>
              <select
                value={selectedService || ''}
                onChange={(e) => handleServiceChange(e.target.value)}
                required
              >
                <option value="">Hizmet Seçiniz</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name} - {service.price} ₺ ({service.duration} min)
                  </option>
                ))}
              </select>
            </div>

            {selectedService && (
              <>
                {/* TAKVİM */}
                <div className="calendar-section">
                  <div className="calendar-header">
                    <button type="button" onClick={previousMonth} className="nav-button">◀</button>
                    <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                    <button type="button" onClick={nextMonth} className="nav-button">▶</button>
                  </div>

                  <div className="calendar-weekdays">
                    {daysOfWeek.map((day, idx) => (
                      <div key={`weekday-${idx}`} className="weekday">{day}</div>
                    ))}
                  </div>

                  <div className="calendar-grid">
                    {(() => {
                      const daysInMonth = getDaysInMonth(currentMonth);
                      const firstDay = getFirstDayOfMonth(currentMonth);
                      const days = [];

                      for (let i = 0; i < firstDay; i++) {
                        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
                      }

                      for (let day = 1; day <= daysInMonth; day++) {
                        const isPast = isDatePast(day);
                        const isBooked = isDateBooked(day);
                        const isSelected = isDateSelected(day);

                        days.push(
                          <button
                            key={`day-${day}`}
                            type="button"
                            className={`calendar-day ${isPast ? 'past' : ''} ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => !isPast && !isBooked && handleDateSelect(day)}
                            disabled={isPast || isBooked}
                            title={isPast ? 'Geçmiş tarih' : isBooked ? 'Dolu' : 'Seç'}
                          >
                            {day}
                          </button>
                        );
                      }

                      return days;
                    })()}
                  </div>

                  <div className="calendar-legend">
                    <div className="legend-item">
                      <div className="legend-color available"></div>
                      <span>Uygun</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color booked"></div>
                      <span>Dolu</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color past"></div>
                      <span>Geçmiş</span>
                    </div>
                  </div>
                </div>

                {/* SEÇİLİ TARİH */}
                {appointmentDate && (
                  <div className="selected-date-info">
                    <p><strong>Seçili Tarih:</strong> {new Date(appointmentDate + 'T00:00:00').toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                )}

                {/* UYGUN SAATLERİ GÖR */}
                {appointmentDate && availableSlots.length > 0 && (
                  <div className="form-group">
                    <label>Saat Seç *</label>
                    <div className="time-slots">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {appointmentDate && availableSlots.length === 0 && !loading && (
                  <div className="no-slots-message">
                    ⚠️ Bu tarihte uygun saat bulunmamaktadır. Lütfen başka bir tarih seçiniz.
                  </div>
                )}
              </>
            )}
          </div>

          {/* NOTLAR */}
          <div className="form-section">
            <div className="form-section-title">Ek Bilgiler</div>

            <div className="form-group">
              <label>Notlar</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Özel istekleriniz varsa yazınız..."
                rows="4"
              />
            </div>
          </div>

          {/* BUTON */}
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? '⏳ Randevu Alınıyor...' : '✓ Randevu Al'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingPage;
