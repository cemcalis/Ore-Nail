import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyAppointmentsPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || (window.location.origin.includes('localhost') ? 'http://localhost:5555/api' : `${window.location.origin}/api`);

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `${API_BASE_URL}/appointments/user/my-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setMessage('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Bu randevuyu iptal etmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `${API_BASE_URL}/appointments/${appointmentId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('✓ Randevu iptal edildi');
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setMessage('Randevu iptal edilemedi');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'Beklemede',
      confirmed: 'Onaylandı',
      completed: 'Tamamlandı',
      cancelled: 'İptal Edildi',
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  return (
    <div className="my-appointments-page">
      <div className="appointments-container">
        <h2>Randevularım</h2>

        {message && (
          <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        {appointments.length === 0 ? (
          <p className="no-appointments">Henüz randevunuz yok</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((apt) => (
              <div key={apt._id} className="appointment-card">
                <div className="appointment-header">
                  <h3>{apt.serviceId.name}</h3>
                  <span className={`status-badge ${apt.status}`}>
                    {getStatusBadge(apt.status)}
                  </span>
                </div>
                <div className="appointment-details">
                  <p>
                    <strong>Tarih:</strong>{' '}
                    {new Date(apt.appointmentDate).toLocaleDateString('tr-TR')}
                  </p>
                  <p>
                    <strong>Saat:</strong> {apt.startTime} - {apt.endTime}
                  </p>
                  <p>
                    <strong>Fiyat:</strong> ${apt.totalPrice}
                  </p>
                  {apt.notes && (
                    <p>
                      <strong>Notlar:</strong> {apt.notes}
                    </p>
                  )}
                </div>
                {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                  <button
                    onClick={() => handleCancelAppointment(apt._id)}
                    className="btn-cancel"
                  >
                    İptal Et
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointmentsPage;
