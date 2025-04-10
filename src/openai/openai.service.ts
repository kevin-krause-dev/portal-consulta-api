import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzePdf(base64Pdf: string) {
    const buffer = Buffer.from(base64Pdf, 'base64');

    const data = await pdfParse(buffer);
    const pdfText = data.text;

    const fullPrompt = `
      Você receberá o texto extraído de um contracheque de servidor público. Com base nesse conteúdo, extraia os seguintes dados e retorne no formato JSON estruturado abaixo:

      {
        "nome": "",
        "matricula": "",
        "cpf": "",
        "valores_recebidos": {
          "subsidio": "",
          "vencimento_efetivo": "",
          "vencimento_temporario": "",
          "total_recebido": ""
        },
        "valores_descontados": {
          "total_descontado": ""
        },
        "calculo_margens": {
          "margem_70": "",
          "margem_consig": "",
          "emprestimo": "",
          "margem_cb": "",
          "margem_cc": ""
        },
        "utilizar": {
          "cartao_beneficio": "",
          "cartao_consignado": "",
          "emprestimo": ""
        }
      }

      Instruções:
      - Use os nomes de campos mesmo que estejam com pequenas variações.
      - Não invente valores. Deixe como "" se não encontrar um dado.
      - Todos os valores devem manter o formato numérico (ex: "6.169,00")
      - Assuma que os valores podem ter vírgula como separador decimal.
      
      ai tem que pegar margens de 80%, 35%, 15%, 10%.
 
      35% é pra empréstimo consignado
      10 é pra cartão
      15 é cartão + alguma coisa
      80% dos 35% não lembro kkkkkk.

      Texto do contracheque:
      """ 
      ${pdfText}
      """
    `.trim();

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: fullPrompt }],
      temperature: 0,
    });

    return response.choices[0].message.content;
  }
}
