import express from "express"
import {createNewExam, findExamById, updateExamById, deleteExamById} from "../controllers/examController.js"

const router= express.Router()

router.post("/exams", createNewExam)

router.get("/exams/:id", findExamById)

router.put("/exams/:id", updateExamById)

router.delete("/exams/:id", deleteExamById)

export default router