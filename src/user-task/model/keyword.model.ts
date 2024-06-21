import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'keyword' })
export class Keyword {
  @Field(() => String, {
    nullable: true,
    description: 'The keyword of the task.',
  })
  keyword: string;

  @Field(() => [String], {
    nullable: true,
    description: 'The secondary keywords of the task.',
  })
  secondaryKeywords?: string[];

  @Field(() => [String], {
    nullable: true,
    description: 'The excluded keywords of the task.',
  })
  excludedKeywords?: string[];
}
