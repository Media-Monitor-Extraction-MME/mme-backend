import { Module } from '@nestjs/common';
import { MentionsService } from './mentions.service';
import { MentionsController } from './mentions.controller';
import { MentionsResolver } from './mentions.resolver';

@Module({
  controllers: [MentionsController],
  providers: [MentionsService, MentionsResolver],
})
export class MentionsModule {}
