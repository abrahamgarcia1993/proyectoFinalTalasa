import express from 'express'
import {createNewContent, findContentById, updateContentById, deleteContentById} from '../controllers/contentController.js'
const router=express.Router()

router.post("/contents", createNewContent)

router.get("/contents/:id", findContentById)

router.put("/contents/:id", updateContentById)

router.delete("/contents/:id",deleteContentById);

export default router