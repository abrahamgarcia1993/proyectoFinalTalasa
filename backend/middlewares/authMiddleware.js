const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // El token suele venir en el formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: No se proporcionó un token' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // acceder a datos de los usuarios logueados
    next(); // Continua con la siguiente función en la ruta
  } catch (error) {
    res.status(400).json({ message: 'Token no válido' });
  }
};

module.exports = authenticateToken;
