# 🚀 Ore-Nail - Hızlı Başlangıç Rehberi

## 📦 Kurulum Adımları

### 1. MongoDB'yi Başlatın

**Windows (MongoDB Community Edition):**
```bash
# MongoDB'nin konfigürasyon dosyasıyla başlatın
mongod --config "C:\Program Files\MongoDB\Server\<version>\mongod.cfg"
```

**macOS (Homebrew):**
```bash
# MongoDB'yi yükleyin (ilk kez)
brew install mongodb-community

# MongoDB'yi başlatın
brew services start mongodb-community

# MongoDB'yi durdur (gerekirse)
brew services stop mongodb-community
```

**Docker ile (herhangi bir sistem):**
```bash
docker run -d -p 27017:27017 --name orenail-mongo mongo
```

**MongoDB Atlas (Bulut):**
- https://www.mongodb.com/cloud/atlas adresine gidin
- Ücretsiz bir küme oluşturun
- Connection string'i kopyalayın ve `.env` dosyasında kullanın

### 2. Backend'i Kurun ve Çalıştırın

```bash
# Proje dizinine gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun (veya var olan .env'i kontrol edin)
# MONGODB_URI ve JWT_SECRET'ı ayarlayın

# Backend sunucusunu başlatın
npm run dev
```

✅ Backend sunucusu başarıyla çalışıyorsa şu mesajı göreceksiniz:
```
✓ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### 3. Frontend'i Kurun ve Çalıştırın

Yeni bir terminal açın ve:

```bash
# Frontend dizinine gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Frontend uygulamasını başlatın
npm start
```

✅ Uygulama otomatik olarak `http://localhost:3000` adresinde açılacaktır.

## 🧪 Uygulamayı Test Edin

### 1. Kayıt Olun

- Ana sayfadaki "Giriş Yap / Kayıt Ol" butonuna tıklayın
- "Kayıt Ol" sekmesine geçin
- Formu doldurun:
  - Ad Soyad: Ahmet Yılmaz
  - E-posta: ahmet@example.com
  - Telefon: 5551234567
  - Şifre: sifre123

### 2. Randevu Yap

- "Randevu Yap" sayfasına gidin
- Hizmet seçin
- Tarih seçin
- "Uygun Saatleri Getir" butonuna tıklayın
- Saat seçin
- "Randevu Yap" butonuna tıklayın

### 3. Admin Paneline Erişin

**Admin Hesabı Oluşturma:**

MongoDB'ye bağlanın ve şu komutu çalıştırın:

```javascript
// MongoDB Shell'de
use orenail
db.users.updateOne(
  { email: "ahmet@example.com" },
  { $set: { isAdmin: true } }
)
```

Sonra çıkış yapıp tekrar giriş yapın. Admin paneline erişebileceksiniz.

**Admin Panelinde:**
- "Randevular" sekmesinde tüm randevuları görün
- Randevu durumunu değiştirin
- "Hizmetler" sekmesinde hizmet ekleyin/silin

## 🔧 Hizmet Ekleme (Admin)

Admin Paneli → Hizmetler sekmesi:

1. "Yeni Hizmet Ekle" formunu doldurun:
   - Hizmet Adı: "Protez Tırnak Aplikasyonu"
   - Açıklama: "Yeni protez tırnakların yapıştırılması"
   - Fiyat: 150
   - Süre: 45 (dakika)

2. "Hizmet Ekle" butonuna tıklayın

## 📝 Önemli Dosyalar

```
backend/
├── .env           <- MongoDB URI ve JWT_SECRET burada
├── server.js      <- API sunucusu
└── routes/        <- API endpoints

frontend/
├── src/App.js     <- Ana bileşen
└── .env           <- React API URL'i
```

## 🐛 Sorun Giderme

### "MongoDB bağlantısı başarısız"

- MongoDB'nin çalışıp çalışmadığını kontrol edin
- `.env` dosyasındaki `MONGODB_URI` doğru mu?
- Default: `mongodb://localhost:27017/orenail`

### "CORS hatası"

- Backend'in `FRONTEND_URL` ayarı doğru mu?
- Frontend'in `REACT_APP_API_URL` doğru mu?

### "Port 5000 kullanımda"

```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Port 3000 kullanımda"

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Sonraki Adımlar

1. **Veritabanını Yedekle**: MongoDB backup'ını düzenli alın
2. **E-mail Bildirimleri**: SMTP ayarlarını configure edin
3. **Ödeme Entegrasyonu**: Stripe veya PayPal ekleyin
4. **Üretim Dağıtması**: Heroku, DigitalOcean vb. servislere deploy edin

## 💡 İpuçları

- Token otomatik olarak 7 gün süreyle geçerlidir
- Zamanı kilitlemek için randevu durumunu "onaylandı" yapın
- Admin panelinden hizmetleri dinamik olarak yönetebilirsiniz

## 🆘 Yardım

Sorularınız varsa lütfen iletişime geçin.

---

**Başarıyla kurdum! Haydi başlayalım 🎉**
