const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['activa', 'cancelada'],
    default: 'activa'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para validar la duración máxima (4 horas)
reservationSchema.pre('save', function(next) {
  const duration = this.endTime - this.startTime;
  const maxDuration = 4 * 60 * 60 * 1000; // 4 horas en milisegundos
  
  if (duration > maxDuration) {
    next(new Error('La reserva no puede exceder 4 horas'));
  }

  // Validar que la reserva no sea para más de una semana en el futuro
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 semana en milisegundos
  const now = new Date();
  if (this.startTime - now > oneWeek) {
    next(new Error('No se pueden hacer reservas con más de una semana de anticipación'));
  }

  next();
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;