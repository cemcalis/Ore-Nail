import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
import BookingPage from './pages/BookingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import './App.css';

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(!!localStorage.getItem('adminToken'));
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src="/logo.jpeg" alt="Ore-Nails Logo" className="navbar-logo" />
            <span className="brand-text">Ore-Nails</span>
          </Link>

          <div className="navbar-menu">
            {adminLoggedIn ? (
              <>
                <Link to="/admin" className="nav-link admin-link">
                  Admin Paneli
                </Link>
                <button onClick={handleAdminLogout} className="btn-logout">
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link to="/admin-login" className="nav-link">
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/admin-login" element={<AdminLogin setAdminLoggedIn={setAdminLoggedIn} />} />
        {adminLoggedIn && <Route path="/admin" element={<AdminDashboard />} />}
      </Routes>
    </>
  );
}

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="hero">
          <h1>🌸 Ore-Nails</h1>
          <p className="subtitle">Profesyonel Protez Tırnak Uzmanı</p>
          <p className="description">
            Sizin için en kaliteli ve yumuşak protez tırnak hizmetlerini sunuyoruz.
            Profesyonel ekibimiz ile güzel, sağlıklı ve doğal görünümlü tırnaklar elde edin.
          </p>

          <div className="hero-buttons">
            <Link to="/booking" className="btn-primary-large">
              Şimdi Randevu Al
            </Link>
          </div>
        </div>

        <div className="services-preview">
          <h2>Hizmetlerimiz</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>💅 Protez Tırnak</h3>
              <p>Doğal görünümlü ve uzun ömürlü protez tırnaklar, size özel tasarım</p>
            </div>
            <div className="service-card">
              <h3>✨ Nail Art</h3>
              <p>Özel tasarımlar ve dekoratif çizimleri ile tırnaklarınızı benzersiz kılın</p>
            </div>
            <div className="service-card">
              <h3>🎨 Renkli Tasarım</h3>
              <p>Çeşitli renk ve tasarım seçenekleri ile kişiselleştirilmiş tırnaklar</p>
            </div>
            <div className="service-card">
              <h3>🔧 Bakım ve Onarım</h3>
              <p>Düzenli bakım ve profesyonel onarım hizmetleri</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
