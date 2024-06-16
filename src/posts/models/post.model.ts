import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sentiment } from './sentiment.model';

@ObjectType({ description: 'post' })
export class Post {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true, description: 'title' })
  title?: string;

  @Field({ nullable: true, description: 'subReddit' })
  subReddit?: string;

  @Field({ description: 'origin' })
  origin: 'Reddit' | 'X (Twitter)';

  @Field({ nullable: true, description: 'upvotes' })
  upvotes: number;

  @Field({ nullable: true, description: 'description' })
  description?: string;

  @Field({ description: 'url' })
  url: string;

  @Field({ description: 'time' })
  time: string;

  @Field({ nullable: true, description: 'collectiveSentiment' })
  collectiveSentiment?: Sentiment;
}
