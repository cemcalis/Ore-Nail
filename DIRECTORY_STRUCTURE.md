# 📁 Ore-Nail Dizin Yapısı

```
orenail/
│
├── 📄 README.md                    ← Ana proje dokümantasyonu
├── 📄 SETUP.md                     ← Kurulum rehberi
├── 📄 API_DOCS.md                  ← API endpoint dokümantasyonu
├── 📄 PROJECT_GUIDE.md             ← Kapsamlı proje rehberi
├── 📄 PROJECT_SUMMARY.md           ← Proje özeti
├── 📄 DEPLOYMENT_CHECKLIST.md      ← Dağıtım kontrol listesi
├── 📄 package.json                 ← Root package.json
├── 📄 .gitignore                   ← Git ignore dosyası
│
├── 📁 backend/                     ← Express.js + MongoDB API
│   │
│   ├── 📄 server.js                ← Ana sunucu dosyası
│   ├── 📄 package.json             ← Backend bağımlılıkları
│   ├── 📄 README.md                ← Backend dokümantasyonu
│   ├── 📄 .env                     ← Çevre değişkenleri (sınırlı)
│   ├── 📄 .env.example             ← Çevre değişkenleri örneği
│   │
│   ├── 📁 controllers/             ← İş mantığı
│   │   ├── 📄 authController.js    ├─ Kayıt/Giriş işlemleri
│   │   ├── 📄 serviceController.js ├─ Hizmet yönetimi
│   │   └── 📄 appointmentController.js ├─ Randevu yönetimi
│   │
│   ├── 📁 models/                  ← MongoDB şemaları
│   │   ├── 📄 User.js              ├─ Kullanıcı şeması
│   │   ├── 📄 Service.js           ├─ Hizmet şeması
│   │   └── 📄 Appointment.js       ├─ Randevu şeması
│   │
│   ├── 📁 routes/                  ← API endpoint tanımları
│   │   ├── 📄 auth.js              ├─ Kimlik doğrulama routes
│   │   ├── 📄 services.js          ├─ Hizmet routes
│   │   └── 📄 appointments.js      ├─ Randevu routes
│   │
│   └── 📁 middleware/              ← Express middleware
│       └── 📄 auth.js              ├─ JWT ve admin doğrulaması
│
├── 📁 frontend/                    ← React uygulaması
│   │
│   ├── 📄 package.json             ← Frontend bağımlılıkları
│   ├── 📄 README.md                ← Frontend dokümantasyonu
│   │
│   ├── 📁 public/                  ← Static dosyalar
│   │   └── 📄 index.html           ├─ HTML template
│   │
│   └── 📁 src/                     ← React kaynak kodu
│       │
│       ├── 📄 App.js               ← Ana bileşen (Routing)
│       ├── 📄 App.css              ├─ Ana styling (navbar, home)
│       ├── 📄 index.js             ├─ React entry point
│       ├── 📄 index.css            ├─ Global styling
│       │
│       ├── 📁 pages/               ← Sayfa bileşenleri
│       │   ├── 📄 AuthPage.js      ├─ Kayıt/Giriş sayfası
│       │   ├── 📄 AuthPage.css     │
│       │   ├── 📄 BookingPage.js   ├─ Randevu oluşturma sayfası
│       │   ├── 📄 BookingPage.css  │
│       │   ├── 📄 MyAppointmentsPage.js ├─ Kullanıcının randevuları
│       │   └── 📄 MyAppointmentsPage.css │
│       │
│       └── 📁 components/          ← Yeniden kullanılabilir bileşenler
│           └── 📁 Admin/           ├─ Admin bileşenleri
│               ├── 📄 AdminDashboard.js   ├─ Admin paneli
│               └── 📄 AdminDashboard.css  ├─ Admin styling
│
└── 📄 Orelogo.jpeg                 ← Logo dosyası (var olan)
```

---

## 📊 Dosya Sayıları

- **JavaScript Dosyaları**: 20
- **CSS Dosyaları**: 8
- **Dokümantasyon**: 7
- **Konfigürasyon**: 5
- **Toplam**: 40+

---

## 🔑 Önemli Dosyalar

### Backend'in Kalbi
- ✅ `backend/server.js` - Tüm routes burada başlar
- ✅ `backend/controllers/appointmentController.js` - Randevu lojik

### Frontend'in Kalbi
- ✅ `frontend/src/App.js` - Routing ve ana yapı
- ✅ `frontend/src/components/Admin/AdminDashboard.js` - Admin paneli

### Veritabanı
- ✅ `backend/models/User.js` - Kullanıcı şeması
- ✅ `backend/models/Service.js` - Hizmet şeması
- ✅ `backend/models/Appointment.js` - Randevu şeması

### Güvenlik
- ✅ `backend/middleware/auth.js` - JWT doğrulaması
- ✅ `backend/models/User.js` - Password hashing

---

## 🚀 Kurulum Yolu

```
1. /Users/shift/Desktop/orenail/  ← BURAYA GİT
2. npm install                    ← Bağımlılıkları yükle
3. cd backend                     ← Backend klasöründe:
   npm install
   npm run dev                    ← Backend sunucusunu başlat
4. cd ../frontend                 ← Frontend klasöründe:
   npm install
   npm start                      ← Frontend başlat
```

---

## 📝 Dokümantasyon Haritası

| Dokümantasyon | Amaç | Hedef Kitle |
|---|---|---|
| README.md | Proje özeti | Herkes |
| SETUP.md | Kurulum adımları | Geliştiriciler |
| API_DOCS.md | API referansi | Backend geliştiricileri |
| PROJECT_GUIDE.md | Kapsamlı rehber | Herkes |
| DEPLOYMENT_CHECKLIST.md | Dağıtım kontrol | DevOps/Deployment |
| backend/README.md | Backend spesifik | Backend geliştiricileri |
| frontend/README.md | Frontend spesifik | Frontend geliştiricileri |

---

## 🔗 Dosya İlişkileri

```
Frontend ←HTTP→ Backend ←Database→ MongoDB
   ↓                ↓                  ↓
Pages/          Controllers/      Collections/
Components/     Routes/           Models/
               Middleware/
```

---

## 💡 Navigasyon İpuçları

### Backend Geliştirme
1. API endpoint eklemek: `backend/routes/` → `backend/controllers/`
2. Veritabanı model: `backend/models/`
3. Güvenlik: `backend/middleware/auth.js`

### Frontend Geliştirme
1. Yeni sayfa: `frontend/src/pages/`
2. Route eklemek: `frontend/src/App.js`
3. Yeniden kullanılabilir bileşen: `frontend/src/components/`

---

**Projeyi açmaya hazır! 🚀**

Tüm dosyalar `/Users/shift/Desktop/orenail` klasöründe bulunmaktadır.
