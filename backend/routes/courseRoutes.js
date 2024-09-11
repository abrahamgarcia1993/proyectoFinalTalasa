// routes/courseRoutes.js
const express = require('express');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCoursesByUser,
    getCoursesByUserAdmin
  } = require('../controllers/courseControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseControllers');
const { uploadFile, downloadFile } = require('../controllers/storageController');

const router = express.Router();
router.post('/courses', authenticateToken, createCourse);
router.get('/courses', getAllCourses);
router.get('/courses/:id', authenticateToken, getCourseById);
router.post('/courses/user/cursosComprados', authenticateToken, getCoursesByUser);
router.post('/courses/user/myCourses', authenticateToken, getCoursesByUserAdmin);
router.put('/courses/:id', authenticateToken, updateCourse);
router.delete('/courses/:id', authenticateToken, deleteCourse);
router.post('/buy/:courseId', authenticateToken, courseController.buyCourse)

router.post('/upload', uploadFile);
router.get(`/files/:id`, authenticateToken, downloadFile);

router.get('/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al dashboard del curso', user: req.user });
});

module.exports = router;
