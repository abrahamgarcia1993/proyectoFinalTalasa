import pool from "../database/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function createUser(first_name, last_name, email, password, role, profile_picture, cv) {
    if (!first_name || !last_name || !email || !password || !role) {
        throw new Error('Missing required fields');
    }

    try {
        const hashedPassword = await hashPassword(password);
        const [result] = await pool.execute(
            "INSERT INTO users (first_name, last_name, email, password, role, profile_picture, cv, created_at, updated_at) VALUES (?,?,?,?,?,?,?,NOW(),NOW())",
            [first_name, last_name, email, hashedPassword, role, profile_picture, cv]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function getUserByEmail(email) {
    try {
        const [result] = await pool.execute("SELECT * FROM users WHERE email=?", [email]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
}

async function getUserById(id) {
    try {
        const [result] = await pool.execute("SELECT * FROM users WHERE id=?", [id]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

async function updateUser(id, first_name, last_name, email, password, role, profile_picture, cv) {
    const params = [first_name, last_name, email, role, profile_picture, cv, id];
    let query = "UPDATE users SET first_name=?, last_name=?, email=?, role=?, profile_picture=?, cv=? WHERE id=?";

    if (password) {
        const hashedPassword = await hashPassword(password);
        query = "UPDATE users SET first_name=?, last_name=?, email=?, password=?, role=?, profile_picture=?, cv=? WHERE id=?";
        params.splice(3, 0, hashedPassword); // Inserta la contraseña en el lugar correcto
    }

    try {
        const [result] = await pool.execute(query, params);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const [result] = await pool.execute("DELETE FROM users WHERE id=?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { createUser, getUserByEmail, getUserById, updateUser, deleteUser };
