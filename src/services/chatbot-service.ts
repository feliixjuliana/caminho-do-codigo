import { GoogleGenerativeAI } from '@google/generative-ai';

export class ChatbotService {
  private ai: GoogleGenerativeAI;
  private readonly model = 'gemini-2.0-flash';

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('A variável de ambiente GEMINI_API_KEY não está definida no arquivo .env.');
    }

    this.ai = new GoogleGenerativeAI(apiKey);
  }

  async getResponse(prompt: string): Promise<string> {
    const systemInstruction = 
      'Você é um assistente de guia de estudos em TI. Seu foco é dar dicas sobre Lógica de Programação, Python, JavaScript e sugerir caminhos para iniciantes sem custo financeiro. Responda de forma motivadora e objetiva. Mantenha as sugestões de cursos genéricas ou baseadas em plataformas abertas como YouTube/Coursera, sem mencionar cursos específicos de terceiros.';

    try {
      const model = this.ai.getGenerativeModel({ model: this.model });

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.5,
        },
        systemInstruction: {
          role: "system",
          parts: [{ text: systemInstruction }],
        },
      });

      return result.response.text();

    } catch (error) {
  console.error('Erro ao chamar a API do Gemini:', JSON.stringify(error, null, 2));
  return 'Desculpe, não consegui processar sua solicitação no momento. Tente novamente mais tarde.';
}
  }
}
