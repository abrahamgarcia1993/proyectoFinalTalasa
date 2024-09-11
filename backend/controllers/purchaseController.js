const Purchase = require('../models/Payment');
const Course = require('../models/Course'); // Modelo de los cursos
const User = require('../models/User'); // Modelo del usuario
const Stripe = require('stripe');


// Función para manejar la compra de un curso
const buyCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.userId; // Usuario autenticado

  try {
    // Verificar si el curso existe
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'El curso no existe' });
    }

    // Creao la compra
    const purchase = await Purchase.create({
      userId,
      courseId,
      purchaseDate: new Date(),
    });

    res.status(201).json({ message: 'Curso comprado exitosamente', purchase });
  } catch (error) {
    console.error('Error en la compra del curso:', error);
    res.status(500).json({ message: 'Error en la compra del curso' });
  }
};

// funcion para pasarela de pago 

const paymentGateway = async (req, res) => {

  try{

    const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

    const { courseId } = req.body;
    const userId = req.user.userId;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'El curso no existe' });
    }

    const existingPurchase = await Purchase.findOne({
      where: {
        userId,
        courseId,
      },
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'Ya has comprado este curso' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.precio * 100,
      currency: 'eur',
      metadata: {
        purchaseId: Math.floor(Math.random() * 1000),
      },
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });

  }catch(error){
    console.error('Error en la pasarela de pago:', error);
    res.status(500).json({ message: 'Error en la pasarela de pago' });
  }

};

const confirmPayment = async (req, res) => {
  const { paymentIntentId, courseId, name, email, userId } = req.body;

  try {

    const stripe = Stripe(process.env.STRIPE_KEY_SECRET);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {

      const purchase = await Purchase.create({
        userId: userId,
        courseId,
        purchaseDate: new Date(),
        amount: paymentIntent.amount / 100,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
      });

      return res.status(200).json({ success: true, purchase });
    } else {
      return res.status(400).json({ success: false, message: 'El pago no ha sido completado.' });
    }
  } catch (error) {
    console.error('Error al capturar el pago:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};


module.exports = { buyCourse, paymentGateway, confirmPayment };
