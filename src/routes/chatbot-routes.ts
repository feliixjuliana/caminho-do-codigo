import express from 'express';
import { ChatbotService } from '../services/chatbot-service';
import { createChatbotControllerHandlers } from '../controllers/chatbot-controller';
import { MongoCourseRepository } from '../database/MongoCourseRepository';

const router = express.Router();

const courseRepository = new MongoCourseRepository();
const chatbotService = new ChatbotService(courseRepository);
const chatbotController = createChatbotControllerHandlers(chatbotService);

router.post('/chatbot', chatbotController.askQuestion);

export default router;
