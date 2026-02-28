import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5555/api';

function AdminLogin({ setAdminLoggedIn }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/admin-login`, {
        password,
      });

      localStorage.setItem('adminToken', response.data.token);
      setMessage('✓ Giriş başarılı!');
      setAdminLoggedIn(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch (error) {
      setMessage('✗ Şifre yanlış!');
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Admin Girişi</h2>

          {message && (
            <div className={`message ${message.includes('✓') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Şifresi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre girin"
                required
                autoFocus
                disabled={loading}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-login">
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <p className="hint">İpucu: admin123</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
