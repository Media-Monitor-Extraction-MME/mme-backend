import { Field, ObjectType } from '@nestjs/graphql';
import { Sentiment } from '../../posts/models/sentiment.model';
// import { Sentiment } from 'src/posts/models/sentiment.model';

@ObjectType({ description: 'mention' })
export class Mention {
  @Field({ description: 'keyword' })
  keyword: string;

  @Field({ description: 'count' })
  count: number;

  @Field({ description: 'origin' })
  origin: string;

  @Field({ description: 'date' })
  date: string;

  @Field({ description: 'sentiment' })
  sentiment: Sentiment;
}
