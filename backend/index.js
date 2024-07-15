import express from "express"
import dotenv from "dotenv"
import logger from "morgan"
import cookieParser from "cookie-parser"
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

/* app.use("/user") */


app.listen(port,()=>{
    console.log(`servidor corriendo en el puerto:${port}`)
})