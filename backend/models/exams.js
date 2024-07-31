import pool from "../database/db.js"

async function createExam(module_number, questions){

    try {
        const [result] = await pool.execute("INSERT INTO exams ( module_number, questions, created_at, updated_at) VALUES (?,?,NOW(),NOW())",
            [module_number, questions]
        )

        if(result.affectedRows>0){
            return result.insertId
        }else{
            return false
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getExamById(id){
    try {
        const[result]= await pool.execute("SELECT * FROM exams where id=?",[id])

        if(result.length>0){
            return result[0]
        }else{
            return null
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
 async function updateExam(id, module_number, questions){
    try {
        const [result]= await pool.execute("UPDATE exams SET module_number=?, questions=?, updated_at=NOW() WHERE id=?",[module_number, questions, id])
        if(result.affectedRows>0){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error(error)
        throw error
    }      
} 
async function deleteExam(id){
    try {
        const [result]= await pool.execute("DELETE FROM exams WHERE id=?",[id])
        if(result.affectedRows>0){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
export {createExam, getExamById,updateExam, deleteExam}