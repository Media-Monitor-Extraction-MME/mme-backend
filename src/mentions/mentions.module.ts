import { Module } from '@nestjs/common';
import { MentionsService } from './mentions.service';
import { MentionsController } from './mentions.controller';
import { MentionsResolver } from './mentions.resolver';
import { PostsModule } from '../posts/posts.module';
import { UserTaskModule } from '../user-task/user-task.module';

@Module({
  controllers: [MentionsController],
  imports: [PostsModule, UserTaskModule],
  providers: [MentionsService, MentionsResolver],
})
export class MentionsModule {}
