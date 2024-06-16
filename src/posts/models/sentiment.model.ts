import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'sentiment' })
export class Sentiment {
  @Field({ description: 'positive' })
  positive: number;
  @Field({ description: 'negative' })
  negative: number;
  @Field({ description: 'neutral' })
  neutral: number;
}
