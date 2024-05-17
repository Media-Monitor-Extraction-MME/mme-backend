import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { SortQuery } from 'src/sort-query/sort-query.interface';
import { Post } from 'src/schemas/post.schema';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  findAll(
    @Query('keywords') queryKeywords: string,
    @Query('startDate') queryStartDate: string,
    @Query('endDate') queryEndDate?: string,
    @Query('limit') queryLimit?: number,
    @Query('offset') queryOffset?: number,
    @Query('sort') querySort?: SortQuery,
  ) {
    if (queryKeywords === undefined) {
      return 'Please provide a start date and keywords';
    }

    const keywords = queryKeywords.split(',');
    const startDate =
      queryStartDate === undefined ? undefined : new Date(queryStartDate);
    let endDate = undefined;
    if (queryEndDate !== undefined) {
      endDate = new Date(queryEndDate);

      if (
        startDate &&
        (endDate as Date).getUTCMilliseconds() < startDate.getUTCMilliseconds()
      ) {
        return 'End date must be after start date';
      }
    }

    console.log(
      `Collecting posts for keywords: (${keywords}) on the date ${startDate}`,
    );

    const posts = this.postsService.findPostsByRange(
      keywords,
      startDate,
      endDate,
      queryLimit ?? 10,
      queryOffset ?? 0,
      querySort ?? undefined,
    );

    // if (querySort) {
    //   return this.SortPosts(posts, querySort);
    // }

    return posts;
  }

  SortPosts(posts: Promise<Post[]>, querySort: SortQuery) {
    switch (querySort.field.toLowerCase()) {
      case 'upvotes':
        return posts.then((posts) =>
          posts.sort((a, b) => {
            if (querySort.order === 'asc') {
              return Number(a.upvotes) - Number(b.upvotes);
            } else {
              return Number(b.upvotes) - Number(a.upvotes);
            }
          }),
        );
      case 'time':
        return posts.then((posts) =>
          posts.sort((a, b) => {
            if (querySort.order === 'asc') {
              return new Date(a.time).getTime() - new Date(b.time).getTime();
            } else {
              return new Date(b.time).getTime() - new Date(a.time).getTime();
            }
          }),
        );
      case 'collectivesentiment':
      case 'sentiment':
        const CombineSentiment = (sentiment: {
          positive: number;
          neutral: number;
          negative: number;
        }): number => {
          return sentiment.positive - sentiment.negative;
        };
        return posts.then((posts) =>
          posts.sort((a, b) => {
            if (querySort.order === 'asc') {
              return (
                CombineSentiment(a.collectiveSentiment) -
                CombineSentiment(b.collectiveSentiment)
              );
            } else {
              return (
                CombineSentiment(b.collectiveSentiment) -
                CombineSentiment(a.collectiveSentiment)
              );
            }
          }),
        );
    }
  }
}
