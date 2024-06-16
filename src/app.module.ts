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
import { AuthzModule } from './authz/authz.module';
import { UserTaskModule } from './user-task/user-task.module';
import { UserService } from './user/user.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      include: [PostsModule, UserModule, MentionsModule],
      autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
      context: ({ req, connection }) => {
        if (connection) {
          return { req: connection.context };
        }
        return { req };
      },
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MentionsModule,
    PostsModule,
    SentimentsModule,
    SubRedditsModule,
    CommentsModule,
    TasksModule,
    AuthzModule,
    UserTaskModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, UserResolver],
})
export class AppModule {}
