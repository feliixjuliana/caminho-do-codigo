import mongoosee, { Schema, Document } from 'mongoose';
import { AdminProps } from '../models/admin-model';

export interface AdminDocs extends AdminProps {
  _id: string;
  createdAt: Date;
}

const adminSchema = new Schema<AdminDocs>({
  _id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

export const adminModel = mongoosee.model<AdminDocs>('Admin', adminSchema);