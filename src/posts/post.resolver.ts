import { UserTaskService } from './../user-task/user-task.service';
// import { PubSub } from 'graphql-subscriptions';
import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service'; // Import the PostService class
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuardGQL } from 'src/authz/authguardgql';

import { CurrentUser } from '../user/decorator/current-user.decorator';
import { CurrentUserTask } from 'src/user-task/decorator/current-user-task.decorator';
import { UserTaskInterceptor } from 'src/user-task/user-task.interceptor';
import { UserTask } from 'src/schemas/user-task.schema';
import { GraphQLError } from 'graphql';

// const pubSub = new PubSub();

@Resolver(() => Post)
@UseGuards(AuthGuardGQL)
@UseInterceptors(UserTaskInterceptor)
export class PostResolver {
  constructor(
    private readonly postService: PostsService,
    private readonly userTaskService: UserTaskService,
  ) {} // Make sure PostService is accessible in the constructor

  @Query(() => [Post], { nullable: true })
  async posts(
    @CurrentUser() user: any,
    @CurrentUserTask() userTask: UserTask,
  ): Promise<Post[]> {
    if (!userTask) {
      throw new GraphQLError('User Task not found please do onboarding');
    }
    const posts = await this.postService.findAllQl({
      userTask: userTask,
    });
    if (!posts || posts.length === 0) {
      return [];
    }
    return posts;
  }

  @Query(() => [Post], { nullable: true })
  async redditPosts(
    @CurrentUser() user: any,
    @CurrentUserTask() userTask: UserTask,
  ): Promise<Post[]> {
    if (!userTask) {
      if (!userTask) {
        throw new GraphQLError('User Task not found please do onboarding');
      }
    }
    const posts = await this.postService.findAllQl({
      origin: 'Reddit',
      userTask: userTask,
    });
    if (!posts || posts.length === 0) {
      return [];
    }
    return posts;
  }

  // , @CurrentUserTask() ut: any

  @Query(() => [Post], { nullable: true })
  async twitterPosts(
    @CurrentUser() user: any,
    @CurrentUserTask() userTask: UserTask,
  ): Promise<Post[]> {
    if (!userTask) {
      if (!userTask) {
        throw new GraphQLError('User Task not found please do onboarding');
      }
    }
    const posts = await this.postService.findAllQl({
      origin: 'X',
      userTask: userTask,
    });
    if (!posts || posts.length === 0) {
      return [];
    }
    return posts;
  }
}
