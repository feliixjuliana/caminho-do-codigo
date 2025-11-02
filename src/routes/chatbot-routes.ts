import express from 'express';
import { ChatbotService } from '../services/chatbot-service';
import { createChatbotControllerHandlers } from '../controllers/chatbot-controller';

var router = express.Router();

const chatbotService = new ChatbotService();
const chatbotController = createChatbotControllerHandlers(chatbotService);

router.post('/chatbot', chatbotController.askQuestion);

export default router;