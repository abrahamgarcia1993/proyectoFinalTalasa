const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

router.post('/verifyToken', authController.verifyToken);

module.exports = router;
