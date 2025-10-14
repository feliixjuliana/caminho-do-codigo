import courseFactory from "../factories/course-factory";
import { Course } from "../models/course-model";
import { CourseRepository } from "../repositories/course-Repository";

interface CourseData {
  title: string;
  category: string;
  imageUrl: string;
  courseUrl: string;
  description: string;
  isFree: boolean;
}

export class CourseService {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async createCourse(data: CourseData): Promise<Course> {
    const newCourse = courseFactory.create(data);
    const savedCourse = await this.courseRepository.save(newCourse);
    return savedCourse;
  }

  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.getAll();
  }

  async getCourseById(id: string): Promise<Course | null> {
    return await this.courseRepository.findById(id);
  }

  async updateCourse(id: string, data: Partial<CourseData>): Promise<Course | null> {
    const courseToUpdate = await this.courseRepository.findById(id);

    if (!courseToUpdate) {
      return null;
    }

    if (data.title !== undefined) courseToUpdate.title = data.title;
    if (data.category !== undefined) courseToUpdate.category = data.category;
    if (data.imageUrl !== undefined) courseToUpdate.imageUrl = data.imageUrl;
    if (data.courseUrl !== undefined) courseToUpdate.courseUrl = data.courseUrl;
    if (data.description !== undefined) courseToUpdate.description = data.description;
    if (data.isFree !== undefined) courseToUpdate.isFree = data.isFree;

    const updatedCourse = await this.courseRepository.update(courseToUpdate);
    return updatedCourse;
  }

  async deleteCourseById(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }
}