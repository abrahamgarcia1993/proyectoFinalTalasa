import pool from "../database/db";
import bcrypt from "bcrypt";

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
}
async function createUser (firs_name, last_name, email, password, role, profile_picture, cv) {
  try {
    const hashedPassword = await hashPassword(password);
    const [result] = await pool.execute(
      "INSERT INTO users (firs_name, last_name, email, password, role, profile_picture, cv) VALUES (?,?,?,?,?,?,?)",
      [firs_name, last_name, email,hashedPassword, role, profile_picture, cv]
    );
    return result.insertId
  } catch (error) {
    console.error(error);
    throw error
  }
}
async function getUserByEmail(email){
    try {
        const [result]= await pool.execute("SELECT * FROM users WHERE email=?", [email])
        if(result.length<1){
            return null
        }else{
            return result[0]
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function getUserById(id){
    try {
        const [result]= await pool.execute("SELECT * FROM users where id=?", [id])

        if(result.length<1){
            return null
        }else{
            return result[0]
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
export{createUser, getUserByEmail, getUserById, getAllContents};