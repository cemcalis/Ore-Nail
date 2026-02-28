# 🎯 İlk Çalıştırma Kontrol Listesi

Ore-Nail sistemini ilk kez çalıştırmak için bu adımları takip edin.

---

## ✅ Adım 1: MongoDB Kurulumu

### Seçenek A: Yerel MongoDB (Önerilen - Geliştime için)

**macOS:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get update
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
1. https://www.mongodb.com/try/download/community adresine git
2. Windows'u indir ve yükle
3. MongoDB Community Service otomatik başlayacak

**Docker (Herhangi bir sistem):**
```bash
docker run -d -p 27017:27017 --name orenail-mongo mongo
```

✅ **Test:** Terminal'de `mongo` yazıp `show dbs` komutunu çalıştır. Başarılı ise devam et.

---

## ✅ Adım 2: Backend Kurulumu

### Terminal 1 - Backend Başlat

```bash
# 1. Backend klasörüne git
cd /Users/shift/Desktop/orenail/backend

# 2. Bağımlılıkları yükle
npm install

# 3. Kontrol et: .env dosyası var mı?
ls -la | grep .env

# 4. Backend'i başlat
npm run dev
```

✅ **Başarılı Çıktı:**
```
✓ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

✅ **Test:** Tarayıcıda `http://localhost:5000/api/health` aç. Şu çıkmalı:
```json
{"status":"OK","message":"Server is running"}
```

---

## ✅ Adım 3: Frontend Kurulumu

### Terminal 2 - Frontend Başlat (Yeni Terminal!)

```bash
# 1. Frontend klasörüne git
cd /Users/shift/Desktop/orenail/frontend

# 2. Bağımlılıkları yükle
npm install

# 3. Frontend'i başlat
npm start
```

✅ **Başarılı:** Tarayıcı otomatik açılarak `http://localhost:3000` yüklenir

---

## ✅ Adım 4: Sistem Test Edilmesi

### 4.1: Kayıt Testi

1. Ana sayfada "Giriş Yap / Kayıt Ol" butonuna tıkla
2. "Kayıt Ol" sekmesine git
3. Formu doldur:
   - Ad Soyad: `Test Kullanıcı`
   - E-posta: `test@example.com`
   - Telefon: `5551234567`
   - Şifre: `testpass123`
4. "Kayıt Ol" butonuna tıkla
5. ✅ Başarılı: "✓ Kayıt başarılı!" mesajı görülmeli

### 4.2: Giriş Testi

1. "Giriş Yap" sekmesine geç
2. E-posta ve şifre gir
3. "Giriş Yap" butonuna tıkla
4. ✅ Başarılı: Ana sayfaya yönlendirilmeli, kullanıcı adı görülmeli

### 4.3: Hizmet Görüntüleme Testi

1. "Randevu Yap" butonuna tıkla
2. ✅ Başarılı: Hizmetler listesi görülmeli (başlangıçta boş olabilir)

---

## ✅ Adım 5: Admin Paneli Kurulumu

### 5.1: Admin Hesabı Oluştur

**Terminal'de MongoDB CLI açmak:**

```bash
# MongoDB shell'i aç
mongosh
```

**MongoDB'de admin yap:**

```javascript
// orenail veritabanını seç
use orenail

// Test kullanıcısını admin yap
db.users.updateOne(
  { email: "test@example.com" },
  { $set: { isAdmin: true } }
)

// Doğrula (optional)
db.users.findOne({ email: "test@example.com" })

// Çık
exit
```

### 5.2: Admin Panelini Test Et

1. Çıkış Yap (sağ üstteki "Çıkış Yap")
2. Tekrar Giriş Yap
3. ✅ Başarılı: Navbar'da "Admin Paneli" menüsü görülmeli
4. "Admin Paneli"ne tıkla
5. ✅ Başarılı: İki tab görülmeli: "Randevular" ve "Hizmetler"

---

## ✅ Adım 6: Hizmet Ekleme

1. Admin Paneli → "Hizmetler" sekmesine git
2. "Yeni Hizmet Ekle" formunu doldur:
   - Hizmet Adı: `Protez Tırnak Aplikasyonu`
   - Açıklama: `Yeni protez tırnakların yapıştırılması`
   - Fiyat: `150`
   - Süre: `45`
3. "Hizmet Ekle" butonuna tıkla
4. ✅ Başarılı: "✓ Hizmet eklendi" mesajı görülmeli
5. ✅ Başarılı: Hizmet "Mevcut Hizmetler" listesinde görülmeli

---

## ✅ Adım 7: Randevu Oluşturma Testi

1. "Randevu Yap" sayfasına git
2. Hizmeti seç (Az önce eklediğin "Protez Tırnak Aplikasyonu")
3. Yarın veya sonraki günü tarih olarak seç
4. "Uygun Saatleri Getir" butonuna tıkla
5. ✅ Başarılı: Saat listesi görülmeli (09:00, 09:30, 10:00, ...)
6. Bir saati seç (örn: 10:00)
7. Notlar kısmına birşey yaz (optional)
8. "Randevu Yap" butonuna tıkla
9. ✅ Başarılı: "✓ Appointment booked successfully!" mesajı

---

## ✅ Adım 8: Randevu Yönetimi Testi

1. "Randevularım" sayfasına git
2. ✅ Başarılı: Az önce oluşturduğun randevu görülmeli
3. Randevunun durumu "Beklemede" olmalı
4. Çıkış Yap

---

## ✅ Adım 9: Admin'den Randevu Yönetimi

1. Admin hesabıyla giriş yap
2. Admin Paneli → "Randevular" sekmesi
3. ✅ Başarılı: Randevunu tabloda görebilmeli
4. Dropdown'dan durumu "Onaylandı" olarak değiştir
5. ✅ Başarılı: "✓ Randevu durumu güncellendi" mesajı

---

## 🚨 Hata Giderme

### "MongoDB bağlantısı başarısız"

```bash
# MongoDB çalışıyor mu kontrol et
brew services list  # macOS
# veya
sudo systemctl status mongodb  # Linux

# Çalışmıyorsa başlat
brew services start mongodb-community  # macOS
# veya
sudo systemctl start mongodb  # Linux
```

### "Port 5000 kullanımda"

```bash
# Port'u açmak için process'i öldür
lsof -i :5000
kill -9 <PID>
```

### "Port 3000 kullanımda"

```bash
# Eski React sunucusunu öldür
lsof -i :3000
kill -9 <PID>
```

### "npm bağımlılıkları yüklü değil"

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### "Token hatası / 401 Unauthorized"

- Tarayıcı konsolu kontrol et (F12 → Console)
- localStorage'da token var mı kontrol et
- Giriş yap ve tekrar dene

---

## 🎉 Başarıyla Tamamlandı!

Eğer tüm adımları tamamladıysan:
- ✅ Backend çalışıyor (http://localhost:5000)
- ✅ Frontend çalışıyor (http://localhost:3000)
- ✅ MongoDB bağlı
- ✅ Kayıt/Giriş çalışıyor
- ✅ Randevu oluşturma çalışıyor
- ✅ Admin paneli çalışıyor
- ✅ Hizmet yönetimi çalışıyor

---

## 📚 Sonraki Adımlar

1. **API'yi Keşfet**: [API_DOCS.md](./API_DOCS.md) oku
2. **Kodu İnceле**: Backend ve Frontend dosyalarını inceле
3. **Özellik Ekle**: Yeni özellikleri geliştir
4. **Dağıt**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) kontrol et

---

## 💡 İpuçları

- **Şifremi Unuttum**: MongoDB'de direkt değiştirebilirsin
- **Tüm Verileri Temizle**: `db.dropDatabase()` MongoDB'de
- **Hizmetleri Sil**: Admin panelinden sil
- **Randevuları Sil**: Durumunu "İptal Edildi" yap

---

**İyi çalışmalar! 🚀**

Sorular varsa [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) kontrol et.
