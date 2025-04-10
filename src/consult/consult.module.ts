import { Module } from '@nestjs/common';
import { ConsultService } from './consult.service';
import { ConsultController } from './consult.controller';
import { OpenAIModule } from 'src/openai/openai.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [OpenAIModule, LogModule],
  controllers: [ConsultController],
  providers: [ConsultService],
})
export class ConsultModule {}
