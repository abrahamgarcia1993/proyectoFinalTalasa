import pool from "../database/db.js";

// Obtener todas las inscripciones de un usuario
async function getEnrollmentsByUserId(userId) {
    try {
        const [result] = await pool.execute("SELECT * FROM enrollments WHERE user_id=?", [userId]);
        return result;
    } catch (error) {
        console.error('Error fetching enrollments by user ID:', error);
        throw error;
    }
}

// Obtener todas las inscripciones de un curso
async function getEnrollmentsByCourseId(courseId) {
    try {
        const [result] = await pool.execute("SELECT * FROM enrollments WHERE course_id=?", [courseId]);
        return result;
    } catch (error) {
        console.error('Error fetching enrollments by course ID:', error);
        throw error;
    }
}

// Crear una nueva inscripción
async function createEnrollment(userId, courseId) {
    try {
        const [result] = await pool.execute(
            "INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES (?, ?, NOW())",
            [userId, courseId]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error creating enrollment:', error);
        throw error;
    }
}

export { getEnrollmentsByUserId, getEnrollmentsByCourseId, createEnrollment };
