import pool from "../database/db.js"

async function createResult(user_id, exam_id, score, review_date = null, review_status = 'pending', comments = null, attempt_number = 1) {
    // Convertir review_date a formato de fecha adecuado
    const formattedReviewDate = review_date ? new Date(review_date).toISOString().slice(0, 19).replace('T', ' ') : null;

    try {
        const [result] = await pool.execute(
            "INSERT INTO results (user_id, exam_id, score, review_date, review_status, comments, attempt_number) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [user_id, exam_id, score, formattedReviewDate, review_status, comments, attempt_number]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating result:', error);
        throw error;
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
const updateResult = async (id, user_id, exam_id, score, review_date, review_status, comments, attempt_number) => {
    try {
        // Reemplaza valores undefined con null
        const params = [
            user_id !== undefined ? user_id : null,
            exam_id !== undefined ? exam_id : null,
            score !== undefined ? score : null,
            review_date !== undefined ? review_date : null,
            review_status !== undefined ? review_status : null,
            comments !== undefined ? comments : null,
            attempt_number !== undefined ? attempt_number : null,
            id
        ];

        const [result] = await pool.execute(
            `UPDATE results 
             SET user_id = ?, exam_id = ?, score = ?, review_date = ?, review_status = ?, comments = ?, attempt_number = ?
             WHERE id = ?`,
            params
        );

        return result;
    } catch (error) {
        console.error("Error updating result:", error);
        throw error;
    }
};

async function deleteResult(id){
    try {
        const [result]= await pool.execute("DELETE FROM results WHERE id=?",[id])
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
export {createResult, getResultById, updateResult, deleteResult}