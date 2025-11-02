import { Request, Response } from 'express';
import { ChatbotService } from '../services/chatbot-service';

export const createChatbotControllerHandlers = (chatbotServiceInstance: ChatbotService) => {

    const askQuestion = async (req: Request, res: Response): Promise<void> => {
        const { question } = req.body;

        if (!question || typeof question !== 'string') {
            res.status(400).json({ message: 'A pergunta é obrigatória.' });
            return;
        }

        try {
            const answer = await chatbotServiceInstance.getResponse(question);
            res.status(200).json({ answer });
        } catch (error: any) {
            res.status(500).json({ 
                message: 'Erro interno ao comunicar com o assistente.', 
                error: error.message 
            });
        }
    };

    return {
        askQuestion,
    };
};