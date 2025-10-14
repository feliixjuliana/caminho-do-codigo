import { adminModel, AdminDocs } from './mongooseAdminModel';
import { Admin } from '../models/admin-model';
import { AdminRepository } from '../repositories/admin-Repository';

export class MongoAdminRepository implements AdminRepository {
  private toEntity(doc: AdminDocs): Admin {
    if (!doc) return null as any;
    return new Admin({
      id: doc._id.toString(),
      username: doc.username,
      password: doc.password,
      createdAt: doc.createdAt,
    });
  }

  private toMongooseDoc(admin: Admin): Partial<AdminDocs> {
    return {
      username: admin.username,
      password: admin.password,
      createdAt: admin.createdAt,
    };
  }

  async save(admin: Admin): Promise<Admin> {
    const doc = await adminModel.create({
      _id: admin.id,
      ...this.toMongooseDoc(admin),
    }) as AdminDocs;
    return this.toEntity(doc);
  }

  async findByUsername(username: string): Promise<Admin | null> {
    const doc = await adminModel.findOne({ username });
    return doc ? this.toEntity(doc) : null;
  }

  async findById(id: string): Promise<Admin | null> {
    const doc = await adminModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async getAll(): Promise<Admin[]> {
    const docs = await adminModel.find({});
    return docs.map(doc => this.toEntity(doc));
  }
}