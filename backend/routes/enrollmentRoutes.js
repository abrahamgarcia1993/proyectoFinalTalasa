import express from 'express';
import { getEnrollmentsForUser, getEnrollmentsForCourse, enrollUser } from '../controllers/enrollmentController.js';

const router = express.Router();


router.get('/users/:userId/enrollments', getEnrollmentsForUser);


router.get('/courses/:courseId/enrollments', getEnrollmentsForCourse);


router.post('/enrollments', enrollUser);

export default router;