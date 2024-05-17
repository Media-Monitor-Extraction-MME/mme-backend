import { Module } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { SentimentsController } from './sentiments.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  controllers: [SentimentsController],
  providers: [SentimentsService],
})
export class SentimentsModule {}
