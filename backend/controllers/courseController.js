// controllers/courseController.js

import { createCourse, getCourseById, getAllCourses, updateCourse, deleteCourse } from '../models/course.js';

const createNewCourse = async (req, res) => {
    const { title, description, price } = req.body;
    try {
        const newCourseId = await createCourse(title, description, price);
        res.status(201).json({ message: "Curso creado correctamente", courseId: newCourseId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el curso" });
    }
};

const findCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await getCourseById(id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: "Curso no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

const findAllCourses = async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

const updateThisCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
        const updated = await updateCourse(id, title, description, price);
        if (updated) {
            res.status(200).json({ message: "Curso actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Curso no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

const deleteThisCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteCourse(id);
        if (deleted) {
            res.status(200).json({ message: "Curso eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Curso no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno" });
    }
};

export { createNewCourse, findCourseById, findAllCourses, updateThisCourse, deleteThisCourse };
