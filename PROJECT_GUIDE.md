# 📖 Ore-Nail Proje Rehberi

Yazılım Mimarisi, Özellikleri ve Geliştirme Talimatları

---

## 📑 İçindekiler

1. [Proje Özeti](#proje-özeti)
2. [Teknoloji Yığını](#teknoloji-yığını)
3. [Mimarı](#mimarı)
4. [Özellikler](#özellikler)
5. [Kurulum](#kurulum)
6. [Kullanım](#kullanım)
7. [Geliştirme](#geliştirme)
8. [Üretim](#üretim)
9. [Sorun Giderme](#sorun-giderme)
10. [SSS](#sss)

---

## 🎯 Proje Özeti

**Ore-Nail** bir protez tırnak uzmanı dükkanı için tam özellikli web tabanlı randevu yönetim sistemidir.

### Hedefler
- ✅ Müşterilerin kolay randevu almalarını sağlamak
- ✅ Admin'in randevuları yönetmesini kolaylaştırmak
- ✅ Hizmetleri dinamik olarak yönetmek
- ✅ Zaman çakışmalarını otomatik olarak kontrol etmek
- ✅ Mobil ve masaüstü uyumlu olması

---

## 🛠️ Teknoloji Yığını

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL veritabanı
- **Mongoose**: MongoDB ODM
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: UI library
- **React Router v6**: Routing
- **Axios**: HTTP client
- **CSS3**: Styling
- **Responsive Design**: Mobile-first

### Deployment
- **Heroku**: Backend (isteğe bağlı)
- **Vercel/Netlify**: Frontend
- **MongoDB Atlas**: Cloud database (isteğe bağlı)

---

## 🏗️ Mimarı

### Sistem Diyagramı

```
┌─────────────────────────────────────────────────┐
│                  Frontend (React)                │
│  ┌──────────────┬──────────────┬──────────────┐ │
│  │    Pages     │ Components   │    Styles    │ │
│  └──────────────┴──────────────┴──────────────┘ │
└────────────────────┬────────────────────────────┘
                     │ HTTP/HTTPS
                     │
┌────────────────────▼────────────────────────────┐
│           Backend (Express.js)                   │
│  ┌──────────────┬──────────────┬──────────────┐ │
│  │   Routes     │ Controllers  │  Middleware  │ │
│  └──────────────┴──────────────┴──────────────┘ │
└────────────────────┬────────────────────────────┘
                     │ MongoDB Protocol
                     │
┌────────────────────▼────────────────────────────┐
│       Database (MongoDB)                         │
│  ┌──────────────┬──────────────┬──────────────┐ │
│  │    Users     │   Services   │ Appointments │ │
│  └──────────────┴──────────────┴──────────────┘ │
└──────────────────────────────────────────────────┘
```

### Dosya Yapısı

```
orenail/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── serviceController.js
│   │   └── appointmentController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── services.js
│   │   └── appointments.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AuthPage.js
│   │   │   ├── BookingPage.js
│   │   │   ├── MyAppointmentsPage.js
│   │   │   └── *.css
│   │   ├── components/
│   │   │   └── Admin/
│   │   │       ├── AdminDashboard.js
│   │   │       └── AdminDashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README.md
│
├── README.md (Ana dokümantasyon)
├── SETUP.md (Kurulum rehberi)
├── API_DOCS.md (API dokümantasyonu)
├── DEPLOYMENT_CHECKLIST.md (Dağıtım kontrol listesi)
├── package.json (Root package.json)
└── .gitignore
```

---

## ✨ Özellikler

### 👤 Kullanıcı Özellikleri

| Özellik | Açıklama |
|---------|----------|
| 📝 Kayıt | E-mail, ad, telefon ve şifre ile yeni hesap oluşturma |
| 🔐 Giriş | Güvenli JWT token tabanlı giriş |
| 📅 Randevu Oluşturma | Tarih, saat ve hizmet seçerek randevu alma |
| 📱 Randevu Yönetimi | Kendi randevularını görüntüleme ve iptal etme |
| 🎯 Uygun Zamanlar | Gerçek zamanlı olarak uygun saatleri görüntüleme |
| 👤 Profil | Kişisel bilgilerine erişme |

### 🛠️ Admin Özellikleri

| Özellik | Açıklama |
|---------|----------|
| 📊 Randevu Yönetimi | Tüm randevuları görüntüleme ve durumlarını değiştirme |
| ➕ Hizmet Ekleme | Yeni hizmetler ekleme |
| ✏️ Hizmet Düzenleme | Mevcut hizmetleri güncelleme |
| 🗑️ Hizmet Silme | Hizmetleri silme |
| 👥 Müşteri Bilgileri | Randevu ayrıntılarından müşteri bilgilerini görüntüleme |
| ⏰ Zaman Yönetimi | Otomatik zaman çakışması kontrolü |

### 🎨 UI/UX Özellikleri

- Modern gradient tasarım
- Responsive mobildesign
- Smooth animasyonlar
- Kullanıcı dostu form validation
- Real-time feedback mesajları
- Kolay navigasyon

---

## 🚀 Kurulum

Detaylı kurulum talimatları için [SETUP.md](./SETUP.md) dosyasını inceleyiniz.

### Hızlı Kurulum

```bash
# 1. Proje dosyalarını klonla
git clone <repo-url> orenail
cd orenail

# 2. MongoDB'yi başlat
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: MongoDB Community Service başlat

# 3. Backend'i kurup çalıştır
cd backend
npm install
npm run dev

# 4. Yeni terminal'de: Frontend'i kurup çalıştır
cd frontend
npm install
npm start
```

Backend: `http://localhost:5000`
Frontend: `http://localhost:3000`

---

## 💻 Kullanım

### 1. Kayıt ve Giriş

1. Ana sayfada "Giriş Yap / Kayıt Ol" butonuna tıkla
2. "Kayıt Ol" sekmesine geç
3. Formu doldur ve kayıt ol
4. Otomatik olarak giriş yapılacak

### 2. Randevu Alma

1. "Randevu Yap" sayfasına git
2. Hizmet seç (örn: "Protez Tırnak Aplikasyonu")
3. Tarih seç
4. "Uygun Saatleri Getir" butonuna tıkla
5. Saati seç
6. "Randevu Yap" butonuna tıkla

### 3. Randevu Yönetimi

1. "Randevularım" sayfasına git
2. Tüm randevularını görüntüle
3. İstersen randevuyu iptal et

### 4. Admin Paneli (Admin Hesabı Gerekli)

1. Admin hesabıyla giriş yap
2. "Admin Paneli" menüsü görünecek
3. **Randevular** sekmesinde:
   - Tüm randevuları görüntüle
   - Durumlarını değiştir (Beklemede → Onaylandı → Tamamlandı)
4. **Hizmetler** sekmesinde:
   - Yeni hizmet ekle
   - Mevcut hizmetleri sil

---

## 👨‍💻 Geliştirme

### Backend Geliştirme

```bash
cd backend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (nodemon ile otomatik reload)
npm run dev

# Kod yapısı:
# controllers/ - API işlevselliği
# routes/ - Endpoint tanımları
# models/ - Veritabanı şemaları
# middleware/ - JWT doğrulaması vs.
```

### Frontend Geliştirme

```bash
cd frontend

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (hot reload)
npm start

# Kod yapısı:
# pages/ - Sayfa bileşenleri
# components/ - Yeniden kullanılabilir bileşenler
# src/App.js - Routing ve ana yapı
```

### Yeni Özellik Ekleme

1. **Backend'te hizmet ekleme:**
   - `controllers/` altında fonksiyon ekle
   - `routes/` altında endpoint tanımla
   - Gerekirse `models/` güncelle

2. **Frontend'te sayfa ekleme:**
   - `pages/` altında yeni React bileşeni oluştur
   - `App.js`'te route'u ekle
   - Gerekli CSS'i ekle

---

## 🚀 Üretim

### Dağıtım Seçenekleri

#### Option 1: Heroku (Backend)

```bash
# 1. Heroku CLI'yi yükle
brew install heroku/brew/heroku

# 2. Giriş yap
heroku login

# 3. Yeni app oluştur
heroku create orenail-api

# 4. Environment variables ekle
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set JWT_SECRET=<strong-secret>

# 5. Dağıt
git push heroku main
```

#### Option 2: DigitalOcean (Backend)

```bash
# 1. VPS oluştur (Ubuntu 20.04)
# 2. SSH ile bağlan
ssh root@<ip-address>

# 3. Node.js kur
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# 4. MongoDB kur veya Atlas kullan
# 5. Repo'yu klonla ve npm install yap
# 6. PM2 kur (process manager)
sudo npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

#### Option 3: Vercel/Netlify (Frontend)

```bash
# 1. Vercel CLI'yi yükle
npm install -g vercel

# 2. Giriş yap
vercel login

# 3. Dağıt
vercel

# veya Netlify:
npm run build
# Netlify web arayüzünde build/ klasörünü drag-drop et
```

### Dağıtım Sonrası Kontrol

- [ ] API sağlıklı mı? (`/api/health`)
- [ ] Frontend yükleniyor mu?
- [ ] Giriş/kayıt çalışıyor mu?
- [ ] Randevu oluşturma başarılı mı?
- [ ] Admin paneli erişilebilir mi?
- [ ] Veritabanı bağlı mı?

---

## 🐛 Sorun Giderme

### MongoDB Bağlantı Hatası

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Çözüm:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Docker
docker run -d -p 27017:27017 mongo

# Atlas kullanıyorsan, .env'i kontrol et
```

### CORS Hatası

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Çözüm:**
```javascript
// backend/server.js'de:
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Port Çakışması

```
Error: listen EADDRINUSE :::5000
```

**Çözüm:**
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Veya farklı port kullan:
PORT=5001 npm run dev
```

### Token Hatası

```
401 Unauthorized: No token provided
```

**Çözüm:**
- Token'ın localStorage'da kayıtlı olup olmadığını kontrol et
- Token'ın expired olup olmadığını kontrol et
- İlgili endpoint'e Authorization header'ını ekle

### Zaman Dilimi Sorunları

**Çözüm:**
```javascript
// Backend'te: UTC kullan
appointmentDate: new Date(appointmentDate).toISOString()

// Frontend'te: LocalDate kullan
new Date(appointmentDate).toLocaleDateString('tr-TR')
```

---

## ❓ SSS

### S: Admin hesabını nasıl oluştururum?

**J:** MongoDB'ye bağlanıp şu komutu çalıştır:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

### S: Şifreyi unuttum, nasıl sıfırlanır?

**J:** Şu an basit şifre sıfırlama yok. MongoDB'de direkt değiştirebilirsin.

### S: Çoklu admin ekleyebilir miyim?

**J:** Evet, aynı prosedürle birden fazla admin oluşturabilirsin.

### S: Randevu silme yerine düzenleme yapabilir miyim?

**J:** Admin'de randevu durumunu iptal et. Silme özelliği future'da eklenebilir.

### S: Mobil uygulama olacak mı?

**J:** React Native kullanarak mobil app yaratılabilir.

### S: Ödeme özelliği eklenebilir mi?

**J:** Evet, Stripe/PayPal entegrasyonu yapılabilir.

### S: Veritabanı yedeğini nasıl alırım?

**J:** MongoDB Atlas ise otomatik yedekleme yapılır. Lokal ise:
```bash
mongodump --db orenail --out ./backup
mongorestore --db orenail ./backup/orenail
```

### S: E-mail bildirimleri gönderilebilir mi?

**J:** Evet, backend'e SMTP yapılandırması eklenebilir.

### S: Daha fazla hizmet kategorisi ekleyebilir miyin?

**J:** Gelecek versiyonda services'e category alanı eklenebilir.

---

## 📞 İletişim & Destek

Sorularınız veya önerileriniz için lütfen iletişime geçin.

---

**Ore-Nail Proje Rehberi v1.0**  
*Son güncelleme: 24 Şubat 2026*
