import express from "express"
import dotenv from "dotenv"
import logger from "morgan"
import cookieParser from "cookie-parser"
import userRoutes from './routes/userRoutes';
import contentRoutes from './routes/contentRoutes';
import examRoutes from './routes/examRoutes';
import resultRoutes from './routes/resultRoutes';

dotenv.config()
const app= express()
const port=process.env.PORT||3001



//middleware
app.use(express.json())
app.use(express.text())
app.use(logger("dev"))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//middleware api

app.use('/api', userRoutes);
app.use('/api', contentRoutes);
app.use('/api', examRoutes);
app.use('/api', resultRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la Academia Deportiva');
  });
  
  // Manejo de errores 404
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
  });
  

app.listen(port,()=>{
    console.log(`servidor corriendo en el puerto:${port}`)
})