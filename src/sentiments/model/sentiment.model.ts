import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Sentiment {
  @Field()
  public mentions: number;

  @Field()
  public keyword: string;

  @Field()
  public sentimentDate: string;

  @Field(() => Float, { nullable: true })
  public sentimentPositive?: number;

  @Field(() => Float, { nullable: true })
  public sentimentNeutral?: number;

  @Field(() => Float, { nullable: true })
  public sentimentNegative?: number;
}
