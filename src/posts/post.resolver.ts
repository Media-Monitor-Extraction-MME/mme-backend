import { UserTaskService } from './../user-task/user-task.service';
// import { PubSub } from 'graphql-subscriptions';
import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service'; // Import the PostService class
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/authz/authguardgql';

import { CurrentUser } from '../user/decorators/user.decorator';

// const pubSub = new PubSub();

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostsService,
    private readonly userTaskService: UserTaskService,
  ) {} // Make sure PostService is accessible in the constructor

  @UseGuards(AuthGuardGQL)
  @Query(() => [Post])
  async posts(@CurrentUser() user: any) {
    const userTask = await this.userTaskService.findUserTask(user['user_id']);
    const posts = await this.postService.findAllQl({
      userTask: userTask,
    });
    if (!posts || posts.length === 0) {
      return [];
    }
    return posts;
  }

  @UseGuards(AuthGuardGQL)
  @Query(() => [Post])
  async redditPosts(@CurrentUser() user: any) {
    const userTask = await this.userTaskService.findUserTask(user['user_id']);
    const posts = await this.postService.findAllQl({
      origin: 'Reddit',
      userTask: userTask,
    });
    if (!posts || posts.length === 0) {
      return [];
    }
    return posts;
  }

  @UseGuards(AuthGuardGQL)
  @Query(() => [Post])
  async twitterPosts(@CurrentUser() user: any) {
    const userTask = await this.userTaskService.findUserTask(user['user_id']);

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
