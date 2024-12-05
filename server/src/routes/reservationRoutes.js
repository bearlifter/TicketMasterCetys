const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createReservation,
  getUserReservations,
  cancelReservation,
  checkRoomAvailability
} = require('../controllers/reservationController');

router.use(protect); // Todas las rutas requieren autenticación

router.post('/', createReservation);
router.get('/me', getUserReservations);
router.get('/check-availability', checkRoomAvailability);
router.put('/:id/cancel', cancelReservation);

module.exports = router;