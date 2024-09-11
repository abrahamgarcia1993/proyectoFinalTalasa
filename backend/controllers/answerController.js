const Exam = require('../models/Exam');


const saveAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // Asegúrate de validar correctamente
    
    // Encuentro el examen basado en el id del examen
    const examId = req.body.examId; 
    if (!examId) {
      return res.status(400).json({ message: 'Falta el ID del examen' });
    }

    const exam = await Exam.findByPk(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }

    // Obtengo las preguntas del examen
    const questions = exam.questions;

    // Actualizo las preguntas con las respuestas del usuario
    answers.forEach(answer => {
      const questionIndex = answer.questionIndex;
      const selectedAnswerIndex = answer.selectedAnswerIndex;

      if (questions[questionIndex]) {
        questions[questionIndex].userAnswer = selectedAnswerIndex; // Añadir respuesta del usuario
      }
    });

    // Guardo el examen actualizado
    await exam.update({ questions });

    res.status(201).json({ message: 'Respuestas guardadas correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveAnswers };


exports.saveAnswers = saveAnswers;
