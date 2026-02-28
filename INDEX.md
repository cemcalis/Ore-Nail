# 📚 Ore-Nail - Dokümantasyon İndeksi

Tüm dokümantasyon ve rehberlere hızlı erişim için bu sayfayı kullanın.

---

## 🚀 HEMEN BAŞLA

### Yeni kullanıcı mısın?
👉 **[FIRST_RUN_CHECKLIST.md](./FIRST_RUN_CHECKLIST.md)**  
Adım adım ilk çalıştırma rehberi (10 dakika)

### Kurulum problemin mi var?
👉 **[SETUP.md](./SETUP.md)**  
Detaylı kurulum ve sorun giderme talimatları

---

## 📖 KAPSAMLI REHBERLER

### 1️⃣ Genel Bakış
- **[README.md](./README.md)** - Proje hakkında genel bilgi
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Proje özeti
- **[COMPLETION_REPORT.md](./COMPLETION_REPORT.md)** - Tamamlama raporu

### 2️⃣ Kurulum & Başlangıç
- **[SETUP.md](./SETUP.md)** - Adım adım kurulum
- **[FIRST_RUN_CHECKLIST.md](./FIRST_RUN_CHECKLIST.md)** - İlk çalıştırma kontrol listesi

### 3️⃣ Teknik Rehberler
- **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)** - Kapsamlı proje rehberi
- **[DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md)** - Dosya yapısı
- **[API_DOCS.md](./API_DOCS.md)** - API endpoint referansi

### 4️⃣ Dağıtım & Üretim
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Üretim dağıtım listesi

### 5️⃣ Bileşen Rehberleri
- **[backend/README.md](./backend/README.md)** - Backend dokümantasyonu
- **[frontend/README.md](./frontend/README.md)** - Frontend dokümantasyonu

---

## 🎯 Hangi Rehberi Okumalıyım?

### Senaryo: "Sistemi ilk kez kurmak istiyorum"
```
1. SETUP.md → Kurulum adımları
2. FIRST_RUN_CHECKLIST.md → Test et
3. API_DOCS.md → API'yi öğren (isteğe bağlı)
```

### Senaryo: "Backend geliştirmek istiyorum"
```
1. PROJECT_GUIDE.md → Mimarı anla
2. API_DOCS.md → Endpoints bilgisi
3. backend/README.md → Backend yapısı
4. DIRECTORY_STRUCTURE.md → Dosya konumları
```

### Senaryo: "Frontend geliştirmek istiyorum"
```
1. PROJECT_GUIDE.md → Mimarı anla
2. frontend/README.md → Frontend yapısı
3. DIRECTORY_STRUCTURE.md → Bileşen konumları
```

### Senaryo: "Üretim için dağıtmak istiyorum"
```
1. DEPLOYMENT_CHECKLIST.md → Kontrol listesi
2. PROJECT_GUIDE.md → Seçenek 1/2/3
3. SETUP.md → Sorun giderme
```

### Senaryo: "Karışık hata alıyorum"
```
1. SETUP.md → Sorun giderme bölümü
2. PROJECT_GUIDE.md → Sorun giderme bölümü
3. FIRST_RUN_CHECKLIST.md → Hata giderme
```

---

## 📂 Proje Yapısı

```
orenail/
├── 📄 README.md                      ← Ana proje özeti
├── 📄 SETUP.md                       ← Kurulum rehberi
├── 📄 API_DOCS.md                    ← API referansi
├── 📄 PROJECT_GUIDE.md               ← Kapsamlı rehber
├── 📄 PROJECT_SUMMARY.md             ← Proje özeti
├── 📄 DIRECTORY_STRUCTURE.md         ← Dosya yapısı
├── 📄 FIRST_RUN_CHECKLIST.md         ← İlk çalıştırma
├── 📄 DEPLOYMENT_CHECKLIST.md        ← Dağıtım listesi
├── 📄 COMPLETION_REPORT.md           ← Tamamlama raporu
├── 📄 INDEX.md                       ← Bu dosya!
│
├── 📁 backend/                       ← Express.js API
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── README.md
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── 📁 frontend/                      ← React App
    ├── package.json
    ├── README.md
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── pages/
        ├── components/
        └── ...
```

---

## 🔑 Önemli Linkler

### 🚀 Hızlı Başlangıç
| Link | Süre |
|------|------|
| [FIRST_RUN_CHECKLIST.md](./FIRST_RUN_CHECKLIST.md) | 10 dakika |
| [SETUP.md](./SETUP.md) | 15 dakika |
| [README.md](./README.md) | 5 dakika |

### 📚 Detaylı Rehberler
| Link | İçerik |
|------|--------|
| [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) | Mimari, özellikler, geliştirme |
| [API_DOCS.md](./API_DOCS.md) | Tüm API endpoints |
| [DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md) | Dosya ve klasörlerin konumu |

### 🚀 Dağıtım
| Link | Amaç |
|------|------|
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Üretim hazırlığı |
| [backend/README.md](./backend/README.md) | Backend dağıtımı |
| [frontend/README.md](./frontend/README.md) | Frontend dağıtımı |

---

## ⏱️ Zaman Tahmini

| Görev | Zaman |
|------|-------|
| Kurulum | 15 dakika |
| İlk Test | 10 dakika |
| Tüm Özellikleri Test | 30 dakika |
| Backend Geliştirme | Değişken |
| Frontend Geliştirme | Değişken |
| Dağıtım | 1-2 saat |

---

## 💡 İpuçları

1. **Hangi rehberi okumalıyım?**  
   → Yukarıdaki "Hangi Rehberi Okumalıyım?" bölümü kontrol et

2. **Hata alıyorum**  
   → SETUP.md veya PROJECT_GUIDE.md'deki sorun giderme bölümü kontrol et

3. **API'yi öğrenmek istiyorum**  
   → API_DOCS.md aç

4. **Proje yapısını anlamak istiyorum**  
   → PROJECT_GUIDE.md veya DIRECTORY_STRUCTURE.md aç

5. **Dağıtmak istiyorum**  
   → DEPLOYMENT_CHECKLIST.md kullan

---

## 🎯 Başarı Kriterleri

### ✅ Sistem Başarılı Kurulmuştur Eğer:
- [ ] Backend `http://localhost:5000` de çalışıyor
- [ ] Frontend `http://localhost:3000` de çalışıyor
- [ ] Kayıt/Giriş çalışıyor
- [ ] Randevu oluşturabiliyorsun
- [ ] Admin paneline erişebiliyorsun
- [ ] Hizmet ekleyebiliyorsun

---

## 📊 Hızlı Referans

### Portlar
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- MongoDB: `localhost:27017`

### Kullanıcı Rolleri
- **Normal Kullanıcı**: Randevu yapabilir
- **Admin**: Her şeyi yönetebilir

### Dosya Konumları
- Backend: `/Users/shift/Desktop/orenail/backend`
- Frontend: `/Users/shift/Desktop/orenail/frontend`
- Dokümantasyon: `/Users/shift/Desktop/orenail/*.md`

---

## 🆘 Hızlı Destek

### Sorun 1: MongoDB Bağlantısı Başarısız
→ SETUP.md → Sorun Giderme → "MongoDB Bağlantı Hatası"

### Sorun 2: Port Çakışması
→ SETUP.md → Sorun Giderme → "Port Çakışması"

### Sorun 3: npm install başarısız
→ SETUP.md → Sorun Giderme → "Bağımlılık Sorunu"

### Sorun 4: API Hatası
→ API_DOCS.md → Hata Kodları

### Sorun 5: Genel Sorular
→ PROJECT_GUIDE.md → SSS

---

## 📞 İletişim

Sorularınız varsa iletişime geçin.

---

## 🎉 Hoşgeldin!

**Ore-Nail Protez Tırnak Randevu Sistemi**'ne hoşgeldiniz!

Başlamak için:
1. **[FIRST_RUN_CHECKLIST.md](./FIRST_RUN_CHECKLIST.md)** → Sistem kurup test et (10 dakika)
2. **[API_DOCS.md](./API_DOCS.md)** → API'yi öğren
3. **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)** → Derine in

---

**Başarılar! 🚀**

*Son Güncelleme: 24 Şubat 2026*
