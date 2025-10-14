import express from 'express';
import { MongoAdminRepository } from '../database/MongoAdminRepository';
import { createAdminControllerHandlers } from '../controllers/admin-controller';
import { AdminService } from '../services/admin-service';
import { authenticate } from '../shared/middlewares/authMiddlewares';

var router = express.Router();

const adminRepository = new MongoAdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = createAdminControllerHandlers(adminService);

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/admins', authenticate, adminController.listAdmins);
router.get('/admins/:id', authenticate, adminController.getAdminById);

export default router;