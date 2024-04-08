import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MentionsModule } from './mentions/mentions.module';
import { PostsModule } from './posts/posts.module';
import { SentimentsModule } from './sentiments/sentiments.module';
import { SubRedditsModule } from './sub-reddits/sub-reddits.module';
import { CommentsModule } from './comments/comments.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MentionsModule,
    PostsModule,
    SentimentsModule,
    SubRedditsModule,
    CommentsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
