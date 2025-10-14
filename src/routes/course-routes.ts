import express from 'express';
import { MongoCourseRepository } from '../database/MongoCourseRepository';
import { createCourseControllerHandlers } from '../controllers/course-controller';
import { CourseService } from '../services/course-service';
import { authenticate } from '../shared/middlewares/authMiddlewares';

var router = express.Router();

const courseRepository = new MongoCourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = createCourseControllerHandlers(courseService);

router.post('/courses', authenticate, courseController.createCourse);
router.get('/courses', courseController.listCourses);
router.get('/courses/:id', courseController.getCourseById);
router.patch('/courses/:id', authenticate, courseController.updateCourse);
router.delete('/courses/:id', authenticate, courseController.deleteCourse);

export default router;