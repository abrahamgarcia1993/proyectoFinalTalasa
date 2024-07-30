import express from 'express'
import {createNewContent, findContentById, updateContentById, deleteContentById} from '../controllers/contentController.js'
const router=express.Router()

router.post("/content", createNewContent)

router.get("/content/:id", findContentById)

router.put("/content/:id", updateContentById)

router.delete("/content/:id",deleteContentById);

export default router