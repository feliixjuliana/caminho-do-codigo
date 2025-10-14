import mongoose, { Schema, Document } from "mongoose";
import { CourseProps } from "../models/course-model";

export interface CourseDocs extends CourseProps {
  _id: string;
  createdAt: Date;
}

const courseSchema = new Schema<CourseDocs>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  courseUrl: { type: String, required: true },
  description: { type: String, required: true },
  isFree: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

export const courseModel = mongoose.model<CourseDocs>('Course', courseSchema);