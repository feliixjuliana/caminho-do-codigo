import { v4 as uuidv4 } from 'uuid';
import { Admin } from '../models/admin-model';

interface AdminData {
  username: string;
  password: string;
}

export default {
  create: (data: AdminData): Admin => {
    return new Admin({
      id: uuidv4(),
      username: data.username,
      password: data.password,
      createdAt: new Date(),
    });
  },
};