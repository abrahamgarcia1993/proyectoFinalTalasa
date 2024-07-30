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
async function updateUser(id, first_name, last_name, email, password, role, profile_picture, cv){
    try {
        const [result]= await pool.execute("UPDATE users SET first_name=?, last_name=?, email=?, password=?, role=?, profile_picture=?, cv=? WHERE id=?",[first_name, last_name, email, password, role, profile_picture, cv, id])
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

async function deleteUser(id){
    try {
        const [result]= await pool.execute("DELETE FROM users WHERE id=?", [id])
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

export{createUser, getUserByEmail, getUserById, updateUser, deleteUser};