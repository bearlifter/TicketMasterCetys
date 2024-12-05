const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

// Rutas públicas
router.get('/', getRooms);
router.get('/:id', getRoom);

// Rutas protegidas (requieren autenticación)
router.post('/', protect, createRoom);
router.put('/:id', protect, updateRoom);
router.delete('/:id', protect, deleteRoom);

module.exports = router;