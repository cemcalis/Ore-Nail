import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555/api';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  // Service form states
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  // Edit service state
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editService, setEditService] = useState({});

  const adminToken = localStorage.getItem('adminToken');

  // Redirect to login if no token
  useEffect(() => {
    if (!adminToken) {
      navigate('/admin-login');
    }
  }, [adminToken, navigate]);

  const fetchAppointments = useCallback(async () => {
    if (!adminToken) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/appointments`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setMessage('❌ Randevular yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [adminToken]);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setMessage('❌ Hizmetler yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!adminToken) return;
    
    if (activeTab === 'calendar' || activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'services') {
      fetchServices();
    }
  }, [activeTab, fetchAppointments, fetchServices, adminToken]);

  const handleUpdateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await axios.put(
        `${API_BASE_URL}/appointments/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setMessage('✓ Randevu durumu güncellendi');
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      setMessage('❌ Randevu güncellenirken hata oluştu');
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    if (!newService.name || !newService.price || !newService.duration) {
      setMessage('❌ Lütfen zorunlu alanları doldurunuz');
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/services`,
        newService,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setMessage('✓ Hizmet başarıyla eklendi');
      setNewService({ name: '', description: '', price: '', duration: '' });
      fetchServices();
    } catch (error) {
      console.error('Error adding service:', error);
      setMessage('❌ Hizmet eklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();

    if (!editService.name || !editService.price || !editService.duration) {
      setMessage('❌ Lütfen zorunlu alanları doldurunuz');
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${API_BASE_URL}/services/${editingServiceId}`,
        editService,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setMessage('✓ Hizmet başarıyla güncellendi');
      setEditingServiceId(null);
      setEditService({});
      fetchServices();
    } catch (error) {
      console.error('Error updating service:', error);
      setMessage('❌ Hizmet güncellenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;

    try {
      setLoading(true);
      await axios.delete(
        `${API_BASE_URL}/services/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setMessage('✓ Hizmet başarıyla silindi');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      setMessage('❌ Hizmet silinirken hata oluştu');
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

  const getAppointmentsForDate = (day) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return (
        aptDate.getDate() === day &&
        aptDate.getMonth() === currentMonth.getMonth() &&
        aptDate.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#98fb98';
      case 'pending': return '#ffeb99';
      case 'completed': return '#87ceeb';
      case 'cancelled': return '#ffb6c1';
      default: return '#fff';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Onaylı';
      case 'pending': return 'Beklemede';
      case 'completed': return 'Tamamlanmış';
      case 'cancelled': return 'İptal';
      default: return status;
    }
  };

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  // Render Calendar Tab
  const renderCalendarTab = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDate(day);
      days.push(
        <div key={`day-${day}`} className="calendar-day">
          <div className="day-number">{day}</div>
          <div className="day-appointments">
            {dayAppointments.map((apt, idx) => (
              <div
                key={`apt-${idx}`}
                className="appointment-badge"
                style={{ backgroundColor: getStatusColor(apt.status) }}
                title={`${apt.customerName} - ${apt.startTime} (${apt.status})`}
              >
                {apt.startTime}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={previousMonth} className="nav-button">◀</button>
          <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
          <button onClick={nextMonth} className="nav-button">▶</button>
        </div>

        <div className="calendar-weekdays">
          {daysOfWeek.map((day, idx) => (
            <div key={`weekday-${idx}`} className="weekday">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {days}
        </div>

        <div className="status-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#98fb98' }}></div>
            <span>Onaylı</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffeb99' }}></div>
            <span>Beklemede</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#87ceeb' }}></div>
            <span>Tamamlanmış</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffb6c1' }}></div>
            <span>İptal</span>
          </div>
        </div>
      </div>
    );
  };

  // Render Appointments Tab
  const renderAppointmentsTab = () => {
    return (
      <div className="appointments-container">
        <h2>Tüm Randevular</h2>
        {appointments.length === 0 ? (
          <p>Henüz randevu yoktur</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <div key={apt._id} className="appointment-card">
                <div className="appointment-info">
                  <div className="customer-info">
                    <h3>{apt.customerName}</h3>
                    <p>📧 {apt.customerEmail}</p>
                    <p>📱 {apt.customerPhone}</p>
                  </div>
                  <div className="appointment-details">
                    <p>
                      <strong>Hizmet:</strong> {apt.serviceId?.name || 'Bilinmeyen'}
                    </p>
                    <p>
                      <strong>Tarih:</strong> {new Date(apt.appointmentDate).toLocaleDateString('tr-TR')}
                    </p>
                    <p>
                      <strong>Saat:</strong> {apt.startTime} - {apt.endTime}
                    </p>
                    <p>
                      <strong>Durum:</strong>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(apt.status) }}
                      >
                        {getStatusLabel(apt.status)}
                      </span>
                    </p>
                    {apt.notes && <p><strong>Notlar:</strong> {apt.notes}</p>}
                  </div>
                </div>

                <div className="appointment-actions">
                  {apt.status !== 'cancelled' && (
                    <>
                      {apt.status !== 'confirmed' && (
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt._id, 'confirmed')}
                          className="btn-approve"
                        >
                          ✓ Onayla
                        </button>
                      )}
                      {apt.status !== 'completed' && (
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt._id, 'completed')}
                          className="btn-complete"
                        >
                          ✓ Tamamla
                        </button>
                      )}
                      <button
                        onClick={() => handleUpdateAppointmentStatus(apt._id, 'cancelled')}
                        className="btn-reject"
                      >
                        ✗ Reddet
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Services Tab
  const renderServicesTab = () => {
    return (
      <div className="services-container">
        <div className="services-grid">
          {/* Add Service Form */}
          <div className="service-form-card">
            <h3>Yeni Hizmet Ekle</h3>
            <form onSubmit={handleAddService}>
              <div className="form-group">
                <label>Hizmet Adı *</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="Örn: Protez Tırnak"
                  required
                />
              </div>
              <div className="form-group">
                <label>Açıklama</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Hizmet açıklaması"
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Fiyat (₺) *</label>
                  <input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Süre (Dakika) *</label>
                  <input
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                    placeholder="30"
                    required
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Ekleniyor...' : '+ Hizmet Ekle'}
              </button>
            </form>
          </div>

          {/* Services List */}
          {services.map((service) => (
            <div key={service._id} className={`service-card ${editingServiceId === service._id ? 'editing' : ''}`}>
              {editingServiceId === service._id ? (
                <form onSubmit={handleUpdateService}>
                  <div className="form-group">
                    <label>Hizmet Adı</label>
                    <input
                      type="text"
                      value={editService.name || ''}
                      onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Açıklama</label>
                    <textarea
                      value={editService.description || ''}
                      onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                      rows="2"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Fiyat (₺)</label>
                      <input
                        type="number"
                        value={editService.price || ''}
                        onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Süre (Dakika)</label>
                      <input
                        type="number"
                        value={editService.duration || ''}
                        onChange={(e) => setEditService({ ...editService, duration: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" disabled={loading} className="btn-primary">
                      ✓ Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingServiceId(null)}
                      className="btn-cancel"
                    >
                      ✗ İptal
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>{service.name}</h3>
                  {service.description && <p className="description">{service.description}</p>}
                  <div className="service-details">
                    <div className="detail">
                      <span className="label">Fiyat:</span>
                      <span className="value">{service.price} ₺</span>
                    </div>
                    <div className="detail">
                      <span className="label">Süre:</span>
                      <span className="value">{service.duration} dakika</span>
                    </div>
                  </div>
                  <div className="service-actions">
                    <button
                      onClick={() => {
                        setEditingServiceId(service._id);
                        setEditService(service);
                      }}
                      className="btn-edit"
                    >
                      ✎ Düzenle
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="btn-delete"
                    >
                      🗑 Sil
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <h1>🎀 Ore-Nails Admin Paneli</h1>

      {message && (
        <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          📅 Takvim
        </button>
        <button
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          📋 Randevular
        </button>
        <button
          className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          ⚙️ Hizmetler
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'calendar' && renderCalendarTab()}
        {activeTab === 'appointments' && renderAppointmentsTab()}
        {activeTab === 'services' && renderServicesTab()}
      </div>
    </div>
  );
}

export default AdminDashboard;
