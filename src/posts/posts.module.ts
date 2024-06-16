import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { PostsController } from './posts.controller';
import { PostResolver } from './post.resolver';
import { UserTaskModule } from 'src/user-task/user-task.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserTaskModule,
  ],
  providers: [PostsService, PostResolver],
  exports: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
