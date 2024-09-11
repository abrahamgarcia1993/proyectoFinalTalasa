const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); // Asegurarse de que el usuario esté autenticado
const { buyCourse, paymentGateway, confirmPayment } = require('../controllers/purchaseController'); // Controlador que manejaremos

// Ruta para comprar un curso
router.post('/purchase', authenticateToken, buyCourse);
router.post('/create-payment-intent', authenticateToken, paymentGateway);
router.post('/confirm-payment', confirmPayment);

module.exports = router;
