// Backend seeding script for test data
// Run with: node seed.js
const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');
const Appointment = require('./models/Appointment');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/orenail');
    console.log('✓ MongoDB bağlantısı sağlandı');

    // Clear existing data
    await Service.deleteMany({});
    await Appointment.deleteMany({});
    console.log('✓ Eski veriler temizlendi');

    // Create services
    const services = await Service.insertMany([
      {
        name: 'Protez Tırnak Tasarımı',
        description: 'Özel tasarım protez tırnaklar',
        price: 150,
        duration: 45,
      },
      {
        name: 'Tırnak Tamir',
        description: 'Hasarlı tırnak tamiri',
        price: 50,
        duration: 30,
      },
      {
        name: 'Tırnak Bakımı',
        description: 'Profesyonel tırnak bakımı',
        price: 75,
        duration: 60,
      },
      {
        name: 'Hızlı Uygulaması',
        description: 'Hızlı protez tırnak uygulaması',
        price: 100,
        duration: 30,
      },
    ]);
    console.log(`✓ ${services.length} hizmet oluşturuldu`);

    // Create sample appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.insertMany([
      {
        customerName: 'Ayşe Yılmaz',
        customerEmail: 'ayse@example.com',
        customerPhone: '+90 555 123 4567',
        serviceId: services[0]._id,
        appointmentDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        startTime: '10:00',
        endTime: '10:45',
        status: 'pending',
        notes: 'Pembe renk tercih ediyor',
        totalPrice: 150,
      },
      {
        customerName: 'Fatma Demir',
        customerEmail: 'fatma@example.com',
        customerPhone: '+90 555 234 5678',
        serviceId: services[0]._id,
        appointmentDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
        startTime: '11:00',
        endTime: '11:45',
        status: 'confirmed',
        notes: '',
        totalPrice: 150,
      },
      {
        customerName: 'Elif Korkmaz',
        customerEmail: 'elif@example.com',
        customerPhone: '+90 555 345 6789',
        serviceId: services[1]._id,
        appointmentDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        startTime: '14:00',
        endTime: '14:30',
        status: 'pending',
        notes: 'İndeksi tamir et',
        totalPrice: 50,
      },
      {
        customerName: 'Zeynep Çetin',
        customerEmail: 'zeynep@example.com',
        customerPhone: '+90 555 456 7890',
        serviceId: services[2]._id,
        appointmentDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
        startTime: '10:00',
        endTime: '11:00',
        status: 'confirmed',
        notes: 'Günlük bakım',
        totalPrice: 75,
      },
      {
        customerName: 'Meryem İşçi',
        customerEmail: 'meryem@example.com',
        customerPhone: '+90 555 567 8901',
        serviceId: services[3]._id,
        appointmentDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days later
        startTime: '15:30',
        endTime: '16:00',
        status: 'pending',
        notes: '',
        totalPrice: 100,
      },
      {
        customerName: 'Nuray Süan',
        customerEmail: 'nuray@example.com',
        customerPhone: '+90 555 678 9012',
        serviceId: services[0]._id,
        appointmentDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week later
        startTime: '09:00',
        endTime: '09:45',
        status: 'completed',
        notes: 'Çok güzel oldu!',
        totalPrice: 150,
      },
    ]);
    console.log(`✓ ${appointments.length} randevu oluşturuldu`);

    console.log('\n✅ Test verisi başarıyla oluşturuldu!');
    console.log(`Hizmetler: ${services.length}`);
    console.log(`Randevular: ${appointments.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  }
}

seed();
