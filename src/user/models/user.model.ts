import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user' })
export class User {
  @Field(() => ID)
  user_id: string;

  @Field({ nullable: true, description: 'email' })
  email: string;

  @Field({ nullable: true, description: 'nickname' })
  nickname: string;

  @Field({ nullable: true, description: 'name' })
  name: string;

  @Field({ nullable: true, description: 'picture' })
  picture: string;
}
