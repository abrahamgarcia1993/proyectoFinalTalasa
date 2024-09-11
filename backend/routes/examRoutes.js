// routes/examRoutes.js
const express = require('express');
const {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
} = require('../controllers/examControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const { saveAnswers } = require('../controllers/answerController');

const router = express.Router();

router.post('/exams', authenticateToken, createExam);
router.get('/exams', authenticateToken, getAllExams);
router.get('/exams/:id', authenticateToken, getExamById);
router.put('/exams/:id', authenticateToken, updateExam);
router.delete('/exams/:id', authenticateToken, deleteExam);

// Ruta para guardar respuestas
router.post('/answers', saveAnswers);

module.exports = router;
