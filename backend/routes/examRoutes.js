import express from "express"
import {createNewExam, findExamById, updateExamById, deleteExamById} from "../controllers/examController"

const router= express.Router()

router.post("/exam", createNewExam)

router.get("/exam/:id", findExamById)

router.put("/exam/:id", updateExamById)

router.delete("/exam/:id", deleteExamById)

export default router