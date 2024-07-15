import pool from "../database/db"

async function createResult(user_id, exam_id, score, submission_date){
    try {
        const [result]= await pool.execute("INSERT INTO results (user_id, exam_id, score, submission_date) VALUES (?,?,?,NOW())",[user_id, exam_id, score, submission_date])
        if(result.affectedRows>0){
            return result.insertId
        }else{
            return null
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getResultById(id){
    try {
        const [results]= await pool.execute("SELECT * FROM results WHERE id=?", [id])

        if(results.length>0){
            return results[0]
        }else{
            return null
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
export {createResult, getResultById}