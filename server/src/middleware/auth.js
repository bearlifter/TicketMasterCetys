const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'No estás autorizado para acceder a esta ruta'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        message: 'El usuario ya no existe'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token inválido'
    });
  }
};

module.exports = { protect };