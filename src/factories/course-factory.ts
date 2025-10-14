import { v4 as uuidv4 } from 'uuid';
import { Course } from '../models/course-model';

interface CourseData {
  title: string;
  category: string;
  imageUrl: string;
  courseUrl: string;
  description: string;
  isFree: boolean;
}

export default {
  create: (data: CourseData): Course => {
    return new Course({
      id: uuidv4(),
      title: data.title,
      category: data.category,
      imageUrl: data.imageUrl,
      courseUrl: data.courseUrl,
      description: data.description,
      isFree: data.isFree,
      createdAt: new Date(),
    });
  },
};