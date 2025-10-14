import { Request, Response } from 'express';
import { AdminService } from '../services/admin-service';
import { generateToken } from '../shared/helpers/jwt';

export const createAdminControllerHandlers = (adminServiceInstance: AdminService) => {

  const registerAdmin = async (req: Request, res: Response): Promise<void> => {
    const { username, passwordText } = req.body;
    try {
      const newAdmin = await adminServiceInstance.registerAdmin({ username, passwordText });
      res.status(201).json({ message: `Admin ${newAdmin.username} registered successfully!`, id: newAdmin.id });
    } catch (error: any) {
      if (error.message === 'Username already exists') {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error registering admin', error: error.message });
      }
    }
  };

  const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const { username, passwordText } = req.body;
    try {
      const admin = await adminServiceInstance.validateAdminLogin(username, passwordText);
      if (!admin) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      const token = generateToken({ adminId: admin.id, username: admin.username });

      res.status(200).json({ message: `Admin ${admin.username} logged in successfully! Seu Token: `, adminId: admin.id, token: token });
    } catch (error: any) {
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  };

  const listAdmins = async (req: Request, res: Response): Promise<void> => {
    const admins = await adminServiceInstance.getAllAdmins();
    res.json(admins);
  };

  const getAdminById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const admin = await adminServiceInstance.getAdminById(id);

    if (!admin) {
      res.status(404).json({ message: `Admin with id:${id} not found.` });
      return;
    }
    res.status(200).json(admin);
  };

  return {
    registerAdmin,
    loginAdmin,
    listAdmins,
    getAdminById,
  };
};