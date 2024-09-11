require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const examRoutes = require('./routes/examRoutes');
const purcharseRoutes = require('./routes/purcharseRoutes');

const path = require('path');
const sequelize = require('./database/db');
const User = require("./models/User");
const Course = require("./models/Course");
const Exam = require("./models/Exam");
const { Files, filesHasManyCourses } = require("./models/Files");
const Payment = require("./models/Payment");
const Question = require("./models/Answer");

const corsOptions = {
  exposedHeaders: ['Content-Disposition'],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Para analizar cuerpos JSON
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes); 
app.use('/api/modules', moduleRoutes); // Asegúrate de que moduleRoutes esté definido
app.use('/api/', examRoutes); // Asegúrate de que examRoutes esté definido
app.use('/api', purcharseRoutes);
app.get('/', (req, res) => {
  res.send('API funcionando');
});


// Sincronizar modelos con la base de datos
// sequelize.sync({ force: false })
//   .then(() => {
    
//     console.log('Tablas sincronizadas');
//   })
//   .catch((err) => {
//     console.error('Error al sincronizar las tablas:', err);
//   });

async function syncModels() {
  try {
    await User.sync();
    await Course.sync();
    await Exam.sync();
    await Files.sync();
    await filesHasManyCourses.sync();
    await Payment.sync();
    await Question.sync();
    console.log('Conexión establecida con la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

syncModels();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
