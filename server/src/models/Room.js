const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  coordinates: {
    x: Number,
    y: Number,
    width: Number,
    height: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;