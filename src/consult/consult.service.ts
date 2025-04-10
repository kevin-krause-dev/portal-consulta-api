import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { LogService } from '../log/log.service';

@Injectable()
export class ConsultService {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly logService: LogService,
  ) {}

  async consultWithAI(pdfBase64: string, userId: any) {
    const result = await this.openaiService.analyzePdf(pdfBase64);

    const parsed = JSON.parse(result);
    const cpf = parsed?.cpf || '';

    if (cpf) {
      await this.logService.createLog(userId, cpf);
    }

    return parsed;
  }
}