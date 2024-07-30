import pool from "../database/db"

async function createContent (title, description, content_url){
    try {
        const [result]=await pool.execute("INSERT INTO contents(title, description, content_url, created_at, updated_at) VALUES (?,?,?,NOW(),NOW())",
            [title, description, content_url]
        )
        return result.insertId
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getContentById(id){
    try {
        const [results]= await pool.execute("SELECT * FROM contents WHERE id=?", [id])
        if(results.length<1){
            return null
        }else{
            return results[0]
        }
        
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function updateContent(id, title, description, content_url){
    try {
        const[result]= await pool.execute("UPDATE contents SET title=?, description=?, content_url=?,updated_at=NOW() WHERE id=?",
            [title, description, content_url, id])
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

async function deleteContent(id){
    try {
        const [result]= await pool.execute("Delete FROM contents WHERE id=?",[id] )

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
async function getAllContents(){
    try {
        const [results]= await pool.execute("SELECT * FROM contents")
        if(results.length>0){
            return results
        }else{
            return null
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}
export{createContent, getContentById, updateContent, deleteContent,getAllContents}