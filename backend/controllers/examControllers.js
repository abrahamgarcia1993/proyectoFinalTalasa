const Exam = require('../models/Exam');
const Course = require('../models/Course');

// Creo un nuevo examen
const createExam = async (req, res) => {
  const { title, description, questions, duration, validityDate, valuePerQuestion, courseId } = req.body;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    const exam = await Exam.create({ title, description, questions, duration, validityDate, valuePerQuestion, courseId });
    res.status(201).json(exam);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el examen', error });
  }
};

// Obtengo todos los exámenes
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los exámenes', error });
  }
};

// Obtenfo un examen por ID
const getExamById = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el examen', error });
  }
};

// Actualizo un examen
const updateExam = async (req, res) => {
  const { id } = req.params;
  const { title, description, questions, duration, validityDate, valuePerQuestion } = req.body;
  try {
    const exam = await Exam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    exam.title = title || exam.title;
    exam.description = description || exam.description;
    exam.questions = questions || exam.questions;
    exam.duration = duration || exam.duration;
    exam.validityDate = validityDate || exam.validityDate;
    exam.valuePerQuestion = valuePerQuestion || exam.valuePerQuestion;
    await exam.save();
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el examen', error });
  }
};

// Elimino un examen
const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findByPk(id);
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    await exam.destroy();
    res.status(204).json({ message: 'Examen eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el examen', error });
  }
};

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
};
