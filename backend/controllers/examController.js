import { createExam, deleteExam, getExamById, updateExam } from "../models/exams"

const createNewExam= async (req, res)=>{
    const {module_number, questions}= req.body
    if(!module_number|| !questions){
        res.status(400).json({message: "Todos los campos son requeridos"})
    }
    try {
        const newExam = await createExam( module_number, questions)
        if(newExam){
            res.status(201).json({message:"El examen se ha creado correctamente"})
        }else{
            res.status(400).json({message:"No se pudo crear el examen"})
            
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error interno"})
    }
}
const findExamById =async (req, res)=>{
    const {id}=req.params
    try {
        const findExam =await getExamById(id)
        if(findExam){
            res.status(200).json({message:"El examen se ha encontrado correctamente"})
        }else{
            res.status(404).json ({message:"El examen no ha sido encontrado"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error interno"})
    }
}
const updateExamById= async (req,res)=>{
    const {id}=req.params
    const {module_number, questions}= req.body
    if(!module_number || !questions){
        res.status(400).json({message:"Todos los campos son requeridos"})
    }
    try {
        const updateExamId= await updateExam(id,module_number, questions)
        if(updateExamId){
            res.status(200).json({message:"El examen se ha actualizado correctamente"})
        }else{
          res.status(404).json({message:"No se ha encontrado el examen"})  
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error interno"})
    }
}
const deleteExamById= async (req, res)=>{
    const {id}=req.params
    try {
        const deleteExamId= await deleteExam(id)
        if(deleteExamId){
            res.status(200).json({message:"El examen se ha eliminado correctamente"})
        }else{
            res.status(404).json({message:"El examen no se ha encontrado"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error interno"})
    }
}
export {createNewExam, findExamById, updateExamById, deleteExamById}