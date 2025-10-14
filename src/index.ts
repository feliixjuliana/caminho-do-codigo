import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import { connectToMongo } from './database/mongoConnet';
import { config } from './config/environment';

import courseRoutes from './routes/course-routes';
import adminRoutes from './routes/admin-routes';

const app: Application = express();
const PORT = config.port;

app.use(express.json());
app.use(cors());
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);

const URL = config.mongo_url;
if (!URL) {
  throw new Error('A variável de ambiente MONGO_URL não está definida.');
}
connectToMongo(URL);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

export default app;