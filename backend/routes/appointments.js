const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Public routes - no authentication required
router.get('/available-slots', appointmentController.getAvailableSlots);
router.get('/booked-dates', appointmentController.getBookedDates);

// Create appointment without authentication - customers can book directly
router.post('/', appointmentController.createAppointment);

// User routes (kept for future use if needed)
router.get('/user/my-appointments', authMiddleware, appointmentController.getUserAppointments);
router.put('/:id/cancel', authMiddleware, appointmentController.cancelAppointment);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, appointmentController.getAllAppointments);
router.put('/:id/status', authMiddleware, adminMiddleware, appointmentController.updateAppointmentStatus);

module.exports = router;
