import { IsString } from 'class-validator';

export class CreateConsultDto {
  @IsString()
  prompt: string;

  @IsString()
  pdfBase64: string;
}