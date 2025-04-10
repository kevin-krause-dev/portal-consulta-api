import { Controller, Post, Body } from '@nestjs/common';
import { ConsultService } from './consult.service';
import { User } from 'src/user/decorators/Index.decorator';

@Controller('consult')
export class ConsultController {
  constructor(private readonly consultService: ConsultService) {}
  
  @Post()
  async handleConsult(
    @Body() body: { pdfBase64: string },
    @User() user,
  ) {
    return this.consultService.consultWithAI(body.pdfBase64, user.sub);
  }
}
