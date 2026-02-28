# Ore-Nail Frontend - React Uygulaması

Ore-Nail protez tırnak randevu sistemi için React tabanlı ön yüz.

## 🚀 Başlangıç

### Gereksinimler

- Node.js (v14 veya daha yeni)
- npm veya yarn

### Kurulum

1. Frontend klasörüne gidin:

```bash
cd frontend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env` dosyası oluşturun:

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Geliştirme sunucusunu başlatın:

```bash
npm start
```

Uygulama otomatik olarak `http://localhost:3000` adresinde açılacaktır.

## 📁 Proje Yapısı

```
frontend/
├── src/
│   ├── pages/
│   │   ├── AuthPage.js - Giriş ve Kayıt sayfası
│   │   ├── BookingPage.js - Randevu oluşturma sayfası
│   │   ├── MyAppointmentsPage.js - Kullanıcının randevuları
│   │   └── *.css - İlgili CSS dosyaları
│   ├── components/
│   │   └── Admin/
│   │       ├── AdminDashboard.js - Admin paneli
│   │       └── AdminDashboard.css
│   ├── App.js - Ana uygulama bileşeni
│   ├── App.css
│   ├── index.js - Entry point
│   └── index.css
├── public/
│   └── index.html - HTML template
└── package.json
```

## 🎨 Özellikler

### Kullanıcı Özellikleri

- ✅ Kayıt ve giriş
- ✅ Hizmet seçimi
- ✅ Randevu oluşturma
- ✅ Uygun saatleri görüntüleme
- ✅ Randevu yönetimi
- ✅ Randevu iptal etme

### Admin Özellikleri

- ✅ Tüm randevuları görüntüleme
- ✅ Randevu durumunu güncelleme
- ✅ Hizmet yönetimi (ekleme, silme, güncelleme)
- ✅ Müşteri bilgilerini görüntüleme

## 🛠️ Teknolojiler

- React 18
- React Router v6
- Axios (HTTP istekleri)
- CSS3 (Modern styling)

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda (mobil, tablet, masaüstü) uyumlu şekilde çalışır.

## 🔐 Güvenlik

- JWT token ile kimlik doğrulama
- LocalStorage'da token depolama
- Admin-only işlemler için korunma

## 🚀 Üretim için Derleme

```bash
npm run build
```

Bu komut, `build` klasöründe optimize edilmiş bir üretim derlemesi oluşturur.

## 📝 Lisans

Bu proje özel kullanım içindir.
