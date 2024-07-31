import pool from "../database/db.js";

async function createCourse(title, description, price) {
    try {
        const [result] = await pool.execute(
            "INSERT INTO courses (title, description, price, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
            [title, description, price]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
}

async function getCourseById(id) {
    try {
        const [result] = await pool.execute("SELECT * FROM courses WHERE id=?", [id]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        throw error;
    }
}

async function getAllCourses() {
    try {
        const [result] = await pool.execute("SELECT * FROM courses");
        return result;
    } catch (error) {
        console.error('Error fetching all courses:', error);
        throw error;
    }
}

async function updateCourse(id, title, description, price) {
    try {
        const [result] = await pool.execute(
            "UPDATE courses SET title=?, description=?, price=?, updated_at=NOW() WHERE id=?",
            [title, description, price, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

async function deleteCourse(id) {
    try {
        const [result] = await pool.execute("DELETE FROM courses WHERE id=?", [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
}

export { createCourse, getCourseById, getAllCourses, updateCourse, deleteCourse };