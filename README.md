# 🌸 Ore-Nail - Protez Tırnak Randevu Sistemi

Protez tırnak uzmanı dükkanı "Ore-Nail" için tam özellikli bir web tabanlı randevu yönetim sistemi ve admin paneli.

## 📋 Proje Yapısı

```
orenail/
├── backend/              # Express.js + MongoDB API
│   ├── controllers/      # İş mantığı
│   ├── models/          # MongoDB şemaları
│   ├── routes/          # API yolları
│   ├── middleware/      # Kimlik doğrulama
│   ├── server.js        # Ana sunucu dosyası
│   ├── package.json
│   ├── .env.example     # Çevre değişkenleri
│   └── README.md        # Backend dokümantasyonu
│
└── frontend/            # React uygulaması
    ├── src/
    │   ├── pages/       # Sayfa bileşenleri
    │   ├── components/  # Yeniden kullanılabilir bileşenler
    │   ├── App.js       # Ana bileşen
    │   └── index.js     # Entry point
    ├── public/
    ├── package.json
    └── README.md        # Frontend dokümantasyonu
```

## ✨ Özellikler

### 👥 Kullanıcı Özellikleri

- **Kayıt ve Giriş**: Güvenli JWT token tabanlı kimlik doğrulama
- **Randevu Oluşturma**: Kolay ve sezgisel arayüzle randevu rezervasyonu
- **Uygun Zamanlar**: Gerçek zamanlı uygun saatleri görüntüleme
- **Randevu Yönetimi**: Kendi randevularını görüntüleme ve iptal etme
- **Hizmet Katalogı**: Tüm mevcut hizmetleri ve fiyatlarını görüntüleme

### 🛠️ Admin Özellikleri

- **Randevu Yönetimi**: Tüm randevuları görüntüleme ve durumlarını güncelleme
- **Hizmet Yönetimi**: Hizmet ekleme, düzenleme ve silme
- **Müşteri Bilgileri**: Randevu ayrıntılarında müşteri bilgilerini görüntüleme
- **Takvim Entegrasyonu**: Zaman çakışmalarını otomatik olarak kontrol etme

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js (v14+)
- npm veya yarn
- MongoDB (yerel veya MongoDB Atlas)

### Backend Kurulumu

```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenleyin
npm run dev
```

Backend sunucusu: `http://localhost:5000`

### Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend uygulaması: `http://localhost:3000`

## 🔗 API Endpoints

Tüm API endpoints'leri için [backend README.md](./backend/README.md) dosyasına bakınız.

### Örnek Kullanım

#### Kayıt Ol
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "5551234567",
    "password": "sifre123"
  }'
```

#### Giriş Yap
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmet@example.com",
    "password": "sifre123"
  }'
```

## 🗄️ Veritabanı

Sistem MongoDB kullanır. Otomatik olarak aşağıdaki koleksiyonları oluşturur:

- **Users**: Kullanıcı hesapları
- **Services**: Hizmet tanımları
- **Appointments**: Randevu kayıtları

## 🔐 Güvenlik

- ✅ Password şifreleme (bcryptjs)
- ✅ JWT token tabanlı kimlik doğrulama
- ✅ Admin-only işlemler koruması
- ✅ CORS güvenliği
- ✅ Input doğrulaması

## 🎨 Tasarım

- **Modern UI**: Gradient renkler ve smooth animasyonlar
- **Responsive Design**: Mobil, tablet ve masaüstü uyumlu
- **Kullanıcı Dostu**: Sezgisel arayüz ve hızlı işlemler

## 📱 Teknolojiler

### Backend
- Express.js
- MongoDB & Mongoose
- JWT (JsonWebToken)
- bcryptjs
- CORS

### Frontend
- React 18
- React Router v6
- Axios
- CSS3

## 🛠️ Geliştirme

Kod değişiklikleri için:

1. Backend: `npm run dev` (nodemon ile otomatik yeniden yükleme)
2. Frontend: `npm start` (hot reload)

## 📝 Admin Hesabı Oluşturma

Admin hesabı oluşturmak için veritabanında kullanıcının `isAdmin` alanını `true` olarak ayarlayın:

```javascript
// MongoDB console'da
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

## 🚀 Üretim Dağıtması

### Backend (Heroku, DigitalOcean, vb.)

1. `.env` dosyasını üretim ayarlarıyla düzenleyin
2. `npm start` ile başlatın
3. MongoDB Atlas kullanın veya kendi MongoDB sunucunuzu ayarlayın

### Frontend (Vercel, Netlify, vb.)

1. `npm run build` ile derleyin
2. `build` klasörünü deploy edin
3. `.env.production` dosyasında API URL'ini ayarlayın

## 📞 İletişim

Sorular veya öneriler için iletişime geçin.

## 📄 Lisans

Bu proje özel kullanım içindir.

---

**Ore-Nail** - Profesyonel protez tırnak hizmetleri 🌸
