import { getResultById ,createResult,updateResult,deleteResult} from "../models/grade";

const createNewResult = async (req, res) => {
    const { user_id, exam_id, score } = req.body;

    if (!user_id || !exam_id || typeof score !== 'number') {
        return res.status(400).json({ message: "Todos los campos son requeridos y deben ser válidos" });
    }

    try {
        const newResult = await createResult(user_id, exam_id, score);

        if (newResult) {
            res.status(201).json({ message: "El resultado se ha creado correctamente", resultId: newResult });
        } else {
            res.status(500).json({ message: "No se pudo crear el resultado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
const findResultById = async(req, res)=>{
    const {id}= req.params

    try {
        const findResult= await getResultById(id)
        if(findResult){
            res.status(200).json({message:"Se ha encontrado el resultado", result:findResult})
        }else{
            res.status(404).json({message:"No se ha encontrado el resultado"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Error interno del servidor"})
    }
}

const updateResultById = async (req, res) => {
    const { id } = req.params;
    const { user_id, exam_id, score } = req.body;

    if (!user_id || !exam_id || typeof score !== 'number') {
        return res.status(400).json({ message: "Todos los campos son requeridos y deben ser válidos" });
    }

    try {
        const updateResultId = await updateResult(id, user_id, exam_id, score);

        if (updateResultId) {
            res.status(200).json({ message: "El resultado se ha actualizado correctamente" });
        } else {
            res.status(404).json({ message: "No se ha encontrado el resultado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
const deleteResultById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteResultId = await deleteResult(id);
        if (deleteResultId) {
            res.status(200).json({ message: "Se ha eliminado correctamente" });
        } else {
            res.status(404).json({ message: "No se ha encontrado el resultado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export {createNewResult, findResultById, updateResultById, deleteResultById}