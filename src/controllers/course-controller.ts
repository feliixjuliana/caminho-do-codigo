import { Request, Response } from 'express';
import { CourseService } from '../services/course-service';

export const createCourseControllerHandlers = (courseServiceInstance: CourseService) => {

  const createCourse = async (req: Request, res: Response): Promise<void> => {
    const { title, category, imageUrl, courseUrl, description, isFree } = req.body;
    const newCourse = await courseServiceInstance.createCourse({ title, category, imageUrl, courseUrl, description, isFree });

    res.status(201).json(newCourse);
  };

  const listCourses = async (req: Request, res: Response): Promise<void> => {
    const courses = await courseServiceInstance.getAllCourses();
    res.json(courses);
  };

  const updateCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedCourse = await courseServiceInstance.updateCourse(id, req.body);

    if (!updatedCourse) {
      res.status(404).json({ message: `Course with ${id} not found. ` });
      return;
    }

    res.status(200).json(updatedCourse);
  };

  const deleteCourse = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await courseServiceInstance.deleteCourseById(id);

    res.status(204).json({ message: `Course with id:${id} deleted successfully` });
  };

  const getCourseById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const course = await courseServiceInstance.getCourseById(id);

    if (!course) {
      res.status(404).json({ message: `Course with id:${id} not found.` });
      return;
    }
    res.status(200).json(course);
  };

  return {
    createCourse,
    listCourses,
    updateCourse,
    deleteCourse,
    getCourseById,
  };
};