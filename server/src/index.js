const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Añadimos esta línea
const reservationRoutes = require('./routes/reservationRoutes');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes); // Añadimos esta línea
app.use('/api/reservations', reservationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de CETYS Reservations funcionando correctamente' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ El puerto ${PORT} está en uso. Intentando con el puerto ${PORT + 1}`);
    server.close();
    app.listen(PORT + 1, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT + 1}`);
    });
  } else {
    console.error('Error al iniciar el servidor:', err);
  }
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});