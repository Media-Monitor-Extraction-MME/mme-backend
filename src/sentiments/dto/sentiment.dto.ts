import { Post } from 'src/schemas/post.schema';

export class Sentiment {
  public mentions: number;
  constructor(
    public keyword: string,
    public sentimentDate: string,
    posts?: Post[],
  ) {
    this.keyword = keyword;
    this.mentions = posts.length;
    if (posts) {
      this.sentiment = {
        positive: Number(
          (
            posts
              .map((post) => post.collectiveSentiment.positive)
              .reduce((partialSum, a) => partialSum + a, 0) / posts.length
          ).toFixed(2),
        ),
        neutral: Number(
          (
            posts
              .map((post) => post.collectiveSentiment.neutral)
              .reduce((partialSum, a) => partialSum + a, 0) / posts.length
          ).toFixed(2),
        ),
        negative: Number(
          (
            posts
              .map((post) => post.collectiveSentiment.negative)
              .reduce((partialSum, a) => partialSum + a, 0) / posts.length
          ).toFixed(2),
        ),
      };
    }
  }
  sentiment?: {
    positive: number;
    neutral: number;
    negative: number;
  };
}
