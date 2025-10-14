import { Course } from '../models/course-model';

export interface CourseRepository {
  save(course: Course): Promise<Course>;
  findById(id: string): Promise<Course | null>;
  getAll(): Promise<Course[]>;
  update(course: Course): Promise<Course | null>;
  delete(id: string): Promise<void>;
}