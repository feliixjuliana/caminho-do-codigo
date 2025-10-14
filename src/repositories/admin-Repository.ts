import { Admin } from '../models/admin-model';

export interface AdminRepository {
  save(admin: Admin): Promise<Admin>;
  findByUsername(username: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
  getAll(): Promise<Admin[]>;
}