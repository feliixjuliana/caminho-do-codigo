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
      'Você é um assistente de guia de estudos em TI. Seu foco é dar dicas sobre a área, ajudar a achar cursos gratuitos referente ao desejo da pessoa e sugerir caminhos para iniciantes sem custo financeiro. Responda de forma motivadora e objetiva. Mantenha as sugestões de cursos com os nossos cadastrados ou baseadas em plataformas abertas como YouTube/Coursera, pode fazer a indicação de outros cursos que não estão listados, assim como dar dicas além das que disponibilizamos e cite sobre os que temos também.';

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
