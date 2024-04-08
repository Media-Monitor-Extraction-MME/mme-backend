import { Module } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { SentimentsController } from './sentiments.controller';

@Module({
  controllers: [SentimentsController],
  providers: [SentimentsService],
})
export class SentimentsModule {}
