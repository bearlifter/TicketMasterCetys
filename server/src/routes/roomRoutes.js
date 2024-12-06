const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deactivateRoom,
  toggleRoomStatus,
  getActiveRooms,
  deleteRoomPermanently, // Nueva función
} = require("../controllers/roomController");

// Rutas públicas
router.get("/", getRooms);
router.get("/:id", getRoom);
router.get("/active", getActiveRooms);

// Rutas protegidas (requieren autenticación y rol de profesor)
router.post("/", protect, authorize("profesor"), createRoom);
router.put("/:id", protect, authorize("profesor"), updateRoom);
router.delete("/:id", protect, authorize("profesor"), deactivateRoom);
router.delete(
  "/:id/permanent",
  protect,
  authorize("profesor"),
  deleteRoomPermanently
); // Nueva ruta
router.patch(
  "/:id/toggle-status",
  protect,
  authorize("profesor"),
  toggleRoomStatus
);

module.exports = router;
