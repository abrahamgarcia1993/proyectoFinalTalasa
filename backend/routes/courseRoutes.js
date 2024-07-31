import express from 'express';
import {
  createNewCourse, findCourseById, findAllCourses, updateThisCourse, deleteThisCourse
} from '../controllers/courseController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();


router.post('/',authenticateToken, createNewCourse);


router.get('/:id',authenticateToken, findCourseById);


router.get('/',authenticateToken, findAllCourses);


router.put('/:id',authenticateToken, updateThisCourse);


router.delete('/:id',authenticateToken, deleteThisCourse);

export default router;
