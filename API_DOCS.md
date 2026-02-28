# 📚 API Dokümantasyonu - Ore-Nail

## 🔐 Kimlik Doğrulama

Tüm işlemler JWT token kullanarak yapılır. Header'a ekleyin:
```
Authorization: Bearer <token>
```

---

## 👤 Kimlik Doğrulama Endpoints

### 1. Kayıt Ol
**POST** `/api/auth/register`

Request:
```json
{
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "phone": "5551234567",
  "password": "sifre123"
}
```

Response (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "isAdmin": false
  }
}
```

### 2. Giriş Yap
**POST** `/api/auth/login`

Request:
```json
{
  "email": "ahmet@example.com",
  "password": "sifre123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "isAdmin": false
  }
}
```

### 3. Profil Getir
**GET** `/api/auth/profile`
- **Auth**: Required ✅
- **Admin**: Not required

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "phone": "5551234567",
  "isAdmin": false,
  "createdAt": "2024-02-20T10:30:00Z"
}
```

---

## 💼 Hizmet Endpoints

### 1. Tüm Hizmetleri Listele
**GET** `/api/services`
- **Auth**: Not required
- **Admin**: Not required

Response (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Protez Tırnak Aplikasyonu",
    "description": "Yeni protez tırnakların yapıştırılması",
    "price": 150,
    "duration": 45,
    "isActive": true,
    "createdAt": "2024-02-20T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Protez Tırnak Bakımı",
    "description": "Mevcut protez tırnakların bakımı",
    "price": 100,
    "duration": 30,
    "isActive": true,
    "createdAt": "2024-02-20T10:30:00Z"
  }
]
```

### 2. Hizmet Detayı Getir
**GET** `/api/services/:id`

Response (200): Tek bir hizmet objesi

### 3. Yeni Hizmet Ekle
**POST** `/api/services`
- **Auth**: Required ✅
- **Admin**: Required ✅

Request:
```json
{
  "name": "Nail Art",
  "description": "Özel tasarımlar ve dekupaj",
  "price": 75,
  "duration": 60
}
```

Response (201):
```json
{
  "message": "Service created successfully",
  "service": { ... }
}
```

### 4. Hizmet Güncelle
**PUT** `/api/services/:id`
- **Auth**: Required ✅
- **Admin**: Required ✅

Request:
```json
{
  "name": "Nail Art - Premium",
  "description": "Premium tasarımlar",
  "price": 100,
  "duration": 75,
  "isActive": true
}
```

### 5. Hizmet Sil
**DELETE** `/api/services/:id`
- **Auth**: Required ✅
- **Admin**: Required ✅

Response (200):
```json
{
  "message": "Service deleted successfully"
}
```

---

## 📅 Randevu Endpoints

### 1. Uygun Zamanları Getir
**GET** `/api/appointments/available-slots`
- **Auth**: Not required
- **Query Parameters**:
  - `serviceId` (required): Hizmet ID'si
  - `date` (required): YYYY-MM-DD formatında tarih

Response (200):
```json
{
  "availableSlots": [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00"
  ]
}
```

### 2. Yeni Randevu Oluştur
**POST** `/api/appointments`
- **Auth**: Required ✅
- **Admin**: Not required

Request:
```json
{
  "serviceId": "507f1f77bcf86cd799439011",
  "appointmentDate": "2024-02-25",
  "startTime": "10:00",
  "notes": "Çok hassas tırnağım var, dikkat edin"
}
```

Response (201):
```json
{
  "message": "Appointment created successfully",
  "appointment": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "serviceId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Protez Tırnak Aplikasyonu",
      "price": 150,
      "duration": 45
    },
    "appointmentDate": "2024-02-25T00:00:00Z",
    "startTime": "10:00",
    "endTime": "10:45",
    "status": "pending",
    "notes": "Çok hassas tırnağım var, dikkat edin",
    "totalPrice": 150,
    "createdAt": "2024-02-20T10:30:00Z"
  }
}
```

### 3. Kullanıcının Randevularını Getir
**GET** `/api/appointments/user/my-appointments`
- **Auth**: Required ✅
- **Admin**: Not required

Response (200): Randevu listesi

### 4. Randevu İptal Et
**PUT** `/api/appointments/:id/cancel`
- **Auth**: Required ✅
- **Admin**: Kendi randevusu varsa

Response (200):
```json
{
  "message": "Appointment cancelled",
  "appointment": { ... }
}
```

### 5. Tüm Randevuları Getir (Admin)
**GET** `/api/appointments`
- **Auth**: Required ✅
- **Admin**: Required ✅

Response (200): Tüm randevuların listesi (kullanıcı ve hizmet bilgileriyle populate)

### 6. Randevu Durumunu Güncelle (Admin)
**PUT** `/api/appointments/:id/status`
- **Auth**: Required ✅
- **Admin**: Required ✅

Request:
```json
{
  "status": "confirmed"
}
```

Geçerli statüsler: `pending`, `confirmed`, `completed`, `cancelled`

Response (200):
```json
{
  "message": "Appointment status updated",
  "appointment": { ... }
}
```

---

## ❌ Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 200 | Başarılı |
| 201 | Oluşturuldu |
| 400 | Hatalı istek |
| 401 | Kimlik doğrulaması başarısız |
| 403 | Yetki yok |
| 404 | Bulunamadı |
| 409 | Zaman çakışması |
| 500 | Sunucu hatası |

---

## 🧪 Curl Örnekleri

### Giriş Yap
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmet@example.com",
    "password": "sifre123"
  }'
```

### Uygun Zamanları Getir
```bash
curl -X GET "http://localhost:5000/api/appointments/available-slots?serviceId=507f1f77bcf86cd799439011&date=2024-02-25"
```

### Randevu Oluştur
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{
    "serviceId": "507f1f77bcf86cd799439011",
    "appointmentDate": "2024-02-25",
    "startTime": "10:00",
    "notes": "Lütfen dikkat edin"
  }'
```

### Hizmet Ekle (Admin)
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "name": "Özel Tasarım",
    "description": "Özel tasarımlar",
    "price": 200,
    "duration": 90
  }'
```

---

## 📊 Veri Modelleri

### User
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "phone": String,
  "password": String (hashed),
  "isAdmin": Boolean,
  "createdAt": Date
}
```

### Service
```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "price": Number,
  "duration": Number,
  "isActive": Boolean,
  "createdAt": Date
}
```

### Appointment
```json
{
  "_id": ObjectId,
  "userId": ObjectId (ref: User),
  "serviceId": ObjectId (ref: Service),
  "appointmentDate": Date,
  "startTime": String (HH:mm),
  "endTime": String (HH:mm),
  "status": String (pending/confirmed/completed/cancelled),
  "notes": String,
  "totalPrice": Number,
  "createdAt": Date
}
```

---

**Son Güncelleme:** 24 Şubat 2026
