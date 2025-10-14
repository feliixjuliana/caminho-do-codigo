import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToMongo(uri: string) {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Conectado ao MongoDB Atlas com sucesso');
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error);
    process.exit(1);
  }
}