import { Module } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { SentimentsController } from './sentiments.controller';
import { PostsModule } from '../posts/posts.module';
import { SentimentsResolver } from './sentiments.resolver';

@Module({
  imports: [PostsModule],
  controllers: [SentimentsController],
  providers: [SentimentsService, SentimentsResolver],
})
export class SentimentsModule {}
