import adminFactory from "../factories/admin-factory";
import { Admin } from "../models/admin-model";
import { AdminRepository } from "../repositories/admin-Repository";
import bcrypt from 'bcrypt';

interface RegisterAdminData {
  username: string;
  passwordText: string;
}

export class AdminService {
  private adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async registerAdmin(data: RegisterAdminData): Promise<Admin> {
    const existingAdmin = await this.adminRepository.findByUsername(data.username);
    if (existingAdmin) {
      throw new Error('Username already exists');
    }

    const saltRounds = 10;
    const password = await bcrypt.hash(data.passwordText, saltRounds);

    const newAdmin = adminFactory.create({
      username: data.username,
      password: password,
    });
    const savedAdmin = await this.adminRepository.save(newAdmin);
    return savedAdmin;
  }

  async validateAdminLogin(username: string, passwordInput: string): Promise<Admin | null> {
    const admin = await this.adminRepository.findByUsername(username);
    if (!admin) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(passwordInput, admin.password);
    if (!isPasswordValid) {
      return null;
    }

    return admin;
  }

  async getAdminById(id: string): Promise<Admin | null> {
    return await this.adminRepository.findById(id);
  }

  async getAllAdmins(): Promise<Admin[]> {
    return await this.adminRepository.getAll();
  }
}