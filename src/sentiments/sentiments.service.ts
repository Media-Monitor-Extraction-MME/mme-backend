import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { Sentiment } from './dto/sentiment.dto';
import { Post } from '../schemas/post.schema';

@Injectable()
export class SentimentsService {
  constructor(private readonly postService: PostsService) {}

  async findAll(keywords: string[]): Promise<Sentiment[]> {
    const currentDate = new Date();
    const lastFiveDays: Date[] = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      lastFiveDays.push(date);
    }

    const sentiments: Sentiment[] = [];
    for (const index in keywords) {
      // Collect posts
      const posts = (
        await this.postService.findAll({ keyword: keywords[index] })
      ).map((post) => {
        return {
          _id: post._id,
          title: post.title,
          upvotes: post.upvotes,
          url: post.url,
          description: post.description,
          origin: post.origin,
          subReddit: post.subReddit,
          time: post.time,
          collectiveSentiment: post.collectiveSentiment,
        };
      });

      const posts_split_by_time: Array<{ time: string; posts: Array<Post> }> =
        [];

      posts.forEach((post) => {
        if (posts_split_by_time.some((item) => item.time === post.time)) {
          const index = posts_split_by_time.findIndex(
            (item) => item.time === post.time,
          );
          posts_split_by_time[index].posts.push(post);
        } else {
          posts_split_by_time.push({ time: post.time, posts: [post] });
        }
      });

      sentiments.push(
        ...posts_split_by_time.map((posts_by_time) => {
          return new Sentiment(
            keywords[index],
            posts_by_time.time,
            posts_by_time.posts,
          );
        }),
      );
    }

    return sentiments;
  }
}
