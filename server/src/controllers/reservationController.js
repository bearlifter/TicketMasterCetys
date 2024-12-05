const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

// Verificar disponibilidad
const checkAvailability = async (roomId, startTime, endTime) => {
  const conflictingReservation = await Reservation.findOne({
    roomId,
    status: 'activa',
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });

  return !conflictingReservation;
};

// Crear reservación
const createReservation = async (req, res) => {
  try {
    const { roomId, startTime, endTime, reason } = req.body;

    // Verificar disponibilidad
    const isAvailable = await checkAvailability(roomId, new Date(startTime), new Date(endTime));
    if (!isAvailable) {
      return res.status(400).json({
        message: 'El salón no está disponible en ese horario'
      });
    }

    const reservation = await Reservation.create({
      userId: req.user._id,
      roomId,
      startTime,
      endTime,
      reason
    });

    await reservation.populate('roomId');
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear la reservación',
      error: error.message
    });
  }
};

// Obtener reservaciones del usuario
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ 
      userId: req.user._id,
      status: 'activa'
    }).populate('roomId');
    
    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener las reservaciones',
      error: error.message
    });
  }
};

// Cancelar reservación
const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user._id,
        status: 'activa'
      },
      { status: 'cancelada' },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        message: 'Reservación no encontrada o ya fue cancelada'
      });
    }

    res.json({ message: 'Reservación cancelada correctamente' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al cancelar la reservación',
      error: error.message
    });
  }
};

// Verificar disponibilidad de un salón
const checkRoomAvailability = async (req, res) => {
  try {
    const { roomId, startTime, endTime } = req.query;
    const isAvailable = await checkAvailability(roomId, new Date(startTime), new Date(endTime));
    
    res.json({ isAvailable });
  } catch (error) {
    res.status(500).json({
      message: 'Error al verificar disponibilidad',
      error: error.message
    });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  cancelReservation,
  checkRoomAvailability
};