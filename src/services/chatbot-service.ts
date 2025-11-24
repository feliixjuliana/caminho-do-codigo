import { GoogleGenerativeAI } from '@google/generative-ai';
import { CourseRepository } from '../repositories/course-Repository';
import { MongoCourseRepository } from '../database/MongoCourseRepository';

export class ChatbotService {
  private ai: GoogleGenerativeAI;
  private readonly model = 'gemini-2.0-flash';
  private courseRepository: CourseRepository;

  constructor(courseRepository?: CourseRepository) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('A variável de ambiente GEMINI_API_KEY não está definida no arquivo .env.');
    }
    this.ai = new GoogleGenerativeAI(apiKey);
    this.courseRepository = courseRepository || new MongoCourseRepository();
  }

  private buildCourseContext(courses: { title: string; category: string; courseUrl: string; isFree?: boolean }[]) {
    if (!courses || courses.length === 0) return 'Nenhum curso cadastrado.';
    const lines = courses.map(c => `- ${c.title} | Categoria: ${c.category} | Link: ${c.courseUrl} | Gratuito: ${c.isFree ? 'Sim' : 'Não'}`);
    return lines.join('\n');
  }

  async getResponse(prompt: string): Promise<string> {
    const courses = await this.courseRepository.getAll();
    const courseContext = this.buildCourseContext(courses);
    const systemInstruction = 
      `Você é um assistente de estudos especializado em TI. 
       Sua prioridade é recomendar SOMENTE os cursos cadastrados na base interna listados abaixo. 
       Use esses cursos como principal fonte de resposta. 
       Caso o usuário peça algo que não exista na lista, sugira alternativas gratuitas do YouTube ou Coursera.
       Seja direto e motivador.
       
       Cursos cadastrados:
       ${courseContext}
      `;

    try {
      const model = this.ai.getGenerativeModel({ model: this.model });
      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800,
        },
        systemInstruction: {
          role: 'system',
          parts: [{ text: systemInstruction }],
        },
      });

      return result.response.text();
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      return 'Desculpe, não consegui processar sua solicitação no momento. Tente novamente mais tarde.';
    }
  }
}
