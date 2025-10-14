import { courseModel, CourseDocs } from './mongooseCourseModel';
import { Course } from '../models/course-model';
import { CourseRepository } from '../repositories/course-Repository';

export class MongoCourseRepository implements CourseRepository {
  private toEntity(doc: CourseDocs): Course {
    if (!doc) return null as any;
    return new Course({
      id: doc._id.toString(),
      title: doc.title,
      category: doc.category,
      imageUrl: doc.imageUrl,
      courseUrl: doc.courseUrl,
      description: doc.description,
      isFree: doc.isFree,
      createdAt: doc.createdAt,
    });
  }

  private toMongooseDoc(course: Course): Partial<CourseDocs> {
    return {
      title: course.title,
      category: course.category,
      imageUrl: course.imageUrl,
      courseUrl: course.courseUrl,
      description: course.description,
      isFree: course.isFree,
      createdAt: course.createdAt,
    };
  }

  async save(course: Course): Promise<Course> {
    const doc = await courseModel.create({
      _id: course.id,
      ...this.toMongooseDoc(course),
    }) as CourseDocs;
    return this.toEntity(doc);
  }

  async findByTitle(title: string): Promise<Course | null> {
    const doc = await courseModel.findOne({ title });
    return doc ? this.toEntity(doc) : null;
  }

  async findById(id: string): Promise<Course | null> {
    const doc = await courseModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async getAll(): Promise<Course[]> {
    const docs = await courseModel.find({});
    return docs.map(doc => this.toEntity(doc));
  }

  async update(course: Course): Promise<Course | null> {
    const doc = await courseModel.findByIdAndUpdate(
      course.id,
      this.toMongooseDoc(course),
      { new: true }
    ) as CourseDocs;
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await courseModel.findByIdAndDelete(id);
  }
}