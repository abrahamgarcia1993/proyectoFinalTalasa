import { getEnrollmentsByUserId, getEnrollmentsByCourseId, createEnrollment } from "../models/enrollment.js";


async function getEnrollmentsForUser(req, res) {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
    }

    try {
        const enrollments = await getEnrollmentsByUserId(userId);
        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error getting enrollments for user:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


async function getEnrollmentsForCourse(req, res) {
    const courseId = parseInt(req.params.courseId, 10);

    if (isNaN(courseId)) {
        return res.status(400).json({ message: "ID de curso inválido" });
    }

    try {
        const enrollments = await getEnrollmentsByCourseId(courseId);
        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error getting enrollments for course:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


async function enrollUser(req, res) {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
        return res.status(400).json({ message: "user_id y course_id son requeridos" });
    }

    try {
        const enrollmentId = await createEnrollment(user_id, course_id);
        res.status(201).json({ message: "Inscripción creada con éxito", enrollmentId });
    } catch (error) {
        console.error('Error creating enrollment:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

export { getEnrollmentsForUser, getEnrollmentsForCourse, enrollUser };
