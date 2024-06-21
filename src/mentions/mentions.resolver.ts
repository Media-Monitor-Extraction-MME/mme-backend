import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { AuthGuardGQL } from 'src/authz/authguardgql';
import { UserTaskInterceptor } from 'src/user-task/user-task.interceptor';
import { Mention } from './models/mention.model';
import { PostsService } from 'src/posts/posts.service';
import { CurrentUserTask } from 'src/user-task/decorator/current-user-task.decorator';
import { UserTask } from 'src/schemas/user-task.schema';
import { GraphQLError } from 'graphql';

@UseGuards(AuthGuardGQL)
@UseInterceptors(UserTaskInterceptor)
@Resolver(() => Mention)
export class MentionsResolver {
  constructor(private readonly postService: PostsService) {}
  @Query(() => [Mention], { nullable: true })
  async mentions(@CurrentUserTask() userTask: UserTask): Promise<Mention[]> {
    if (!userTask) {
      throw new GraphQLError('User Task not found please do onboarding');
    }
    const posts = await this.postService.findAllQl({
      userTask: userTask,
    });

    if (!posts || posts.length === 0) {
      return [];
    }

    const mentions: Mention[] = [];

    for (const post of posts) {
      const keywords = [];
      userTask.keywords.forEach((k) => {
        if (post.title.includes(k.keyword)) {
          keywords.push(k.keyword);
        }
      });

      if (keywords.length === 0) {
        continue;
      }

      for (const keyword of keywords) {
        const index = mentions.findIndex(
          (m) =>
            m.keyword === keyword &&
            m.date === new Date(post.time).toDateString() &&
            m.origin === post.origin,
        );

        if (index === -1) {
          mentions.push({
            keyword: keyword,
            count: 1,
            origin: post.origin,
            date: new Date(post.time).toDateString(),
            sentiment: {
              positive: post.collectiveSentiment.positive,
              negative: post.collectiveSentiment.negative,
              neutral: post.collectiveSentiment.neutral,
            },
          });
        } else {
          mentions[index].count += 1;
          mentions[index].sentiment.positive +=
            post.collectiveSentiment.positive;
          mentions[index].sentiment.negative +=
            post.collectiveSentiment.negative;
          mentions[index].sentiment.neutral += post.collectiveSentiment.neutral;
        }
      }
    }

    return mentions
      .map((m) => {
        const fullSentiment =
          m.sentiment.positive + m.sentiment.negative + m.sentiment.neutral;
        m.sentiment.positive = (1 / fullSentiment) * m.sentiment.positive;
        m.sentiment.negative = (1 / fullSentiment) * m.sentiment.negative;
        m.sentiment.neutral = (1 / fullSentiment) * m.sentiment.neutral;
        return m;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [
      {
        keyword: 'keyword',
        count: 1,
        sentiment: {
          positive: 1,
          negative: 1,
          neutral: 1,
        },
      },
    ] as Mention[];
  }
}
