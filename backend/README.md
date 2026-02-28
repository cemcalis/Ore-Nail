# Ore-Nail Protez Tırnak Randevu Sistemi

Profesyonel protez tırnak hizmetleri için tam özellikli bir randevu sistemi ve admin paneli.

## 🚀 Başlangıç

### Gereksinimler

- Node.js (v14 veya daha yeni)
- MongoDB (yerel olarak veya MongoDB Atlas)
- npm veya yarn

### Backend Kurulumu

1. Backend klasörüne gidin:

```bash
cd backend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env` dosyası oluşturun (`.env.example`'ı referans alın):

```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyin ve ayarlarınızı girin:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/orenail
JWT_SECRET=your-super-secret-key-here
FRONTEND_URL=http://localhost:3000
```

5. Backend sunucusunu başlatın:

```bash
npm run dev
```

Backend sunucusu `http://localhost:5000` adresinde çalışacaktır.

## API Endpoints

### Kimlik Doğrulama

- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı giriş
- `GET /api/auth/profile` - Profili getir (Token gerekli)

### Hizmetler

- `GET /api/services` - Tüm hizmetleri listele
- `GET /api/services/:id` - Belirli hizmeti getir
- `POST /api/services` - Yeni hizmet ekle (Admin)
- `PUT /api/services/:id` - Hizmeti güncelle (Admin)
- `DELETE /api/services/:id` - Hizmeti sil (Admin)

### Randevular

- `GET /api/appointments/available-slots` - Uygun zamanları getir
- `POST /api/appointments` - Yeni randevu oluştur
- `GET /api/appointments/user/my-appointments` - Kullanıcının randevularını getir
- `PUT /api/appointments/:id/cancel` - Randevu iptal et
- `GET /api/appointments` - Tüm randevuları getir (Admin)
- `PUT /api/appointments/:id/status` - Randevu durumunu güncelle (Admin)

## 🗄️ MongoDB Koleksiyonları

### Users

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String (unique)",
  "phone": "String",
  "password": "String (hashed)",
  "isAdmin": "Boolean",
  "createdAt": "Date"
}
```

### Services

```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String",
  "price": "Number",
  "duration": "Number (minutes)",
  "isActive": "Boolean",
  "createdAt": "Date"
}
```

### Appointments

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: User)",
  "serviceId": "ObjectId (ref: Service)",
  "appointmentDate": "Date",
  "startTime": "String (HH:mm)",
  "endTime": "String (HH:mm)",
  "status": "String (pending/confirmed/completed/cancelled)",
  "notes": "String",
  "totalPrice": "Number",
  "createdAt": "Date"
}
```

## 🔧 Geliştirme

Kodda değişiklik yaptıktan sonra sunucu otomatik olarak yeniden yüklenir:

```bash
npm run dev
```

## 📝 Lisans

Bu proje özel kullanım içindir.
