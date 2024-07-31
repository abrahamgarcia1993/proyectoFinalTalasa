import express from "express"
import{createNewResult, findResultById, updateResultById, deleteResultById} from "../controllers/resultController.js"

const router= express.Router()

router.post("/results", createNewResult)

router.get("/results/:id", findResultById)

router.put("/results/:id",updateResultById)

router.delete("/results/:id",deleteResultById)

export default router