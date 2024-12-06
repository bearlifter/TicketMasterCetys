const Room = require("../models/Room");

// Obtener todos los salones (activos e inactivos)
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find(); // Elimina cualquier filtro por isActive
    res.json(rooms || []); // Devuelve todos los salones
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los salones", error: error.message });
  }
};

const getActiveRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true }); // Filtra por isActive: true
    res.json(rooms || []);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los salones", error: error.message });
  }
};

// Eliminar un salón definitivamente
const deleteRoomPermanently = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }

    res.json({ message: "Salón eliminado permanentemente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el salón",
      error: error.message,
    });
  }
};

// Obtener un salón específico
const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el salón",
      error: error.message,
    });
  }
};

// Crear un nuevo salón
const createRoom = async (req, res) => {
  try {
    const { roomNumber, area, coordinates } = req.body;

    // Verificar si el salón ya existe
    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      return res
        .status(400)
        .json({ message: "Este número de salón ya existe" });
    }

    const room = await Room.create({
      roomNumber,
      area,
      coordinates,
      isActive: true,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el salón",
      error: error.message,
    });
  }
};

// Actualizar un salón
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el salón",
      error: error.message,
    });
  }
};

// Desactivar un salón (cambiar isActive a false)
const deactivateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }

    res.json({ message: "Salón desactivado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al desactivar el salón",
      error: error.message,
    });
  }
};

// Alternar estado de un salón (activo/inactivo)
const toggleRoomStatus = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Salón no encontrado" });
    }

    room.isActive = !room.isActive;
    await room.save();

    res.json({
      message: `El salón ha sido ${room.isActive ? "activado" : "desactivado"}`,
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al cambiar el estado del salón",
      error: error.message,
    });
  }
};

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deactivateRoom,
  toggleRoomStatus,
  deleteRoomPermanently,
  getActiveRooms,
};
