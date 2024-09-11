const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

// Función para manejar el registro de usuarios
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifico si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encripto la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('password encriptada',{hashedPassword})

    // Creo el nuevo usuario
    const newUser = await User.create({
      username: name,
      email,
      password: hashedPassword,
    });

    // Respuesta con el nuevo usuario
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: `Error en el registro` });
  }
};

// Función para manejar el inicio de sesión de usuarios
const login = async (req, res) => {
  const { email, password } = req.body;
  /* console.log('aqui hay error',{email}); */

  try {
    // Busco el usuario por email
    const user = await User.findOne({ where: { email } });
    /* console.log('user encontrado',{user}) */

    if (!user) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }


    // Comparar la contraseña proporcionada con el hash almacenado

    const isPasswordValid = await bcrypt.compare(password, user.password);

    const newPass = user.password
    console.log('password ingresada',{password},'password en db',{newPass})
    console.log('password valida',{isPasswordValid})
   
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Responder con el token y datos del usuario
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
};


const verifyToken = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no encontrado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Busca al usuario en la base de datos
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      isValid: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(403).json({ message: 'Token no válido' });
  }
};


module.exports = {
  register,
  login,
  verifyToken
};
