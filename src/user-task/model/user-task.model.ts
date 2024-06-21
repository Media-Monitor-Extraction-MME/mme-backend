import { ObjectType, Field } from '@nestjs/graphql';
import { Keyword } from './keyword.model';
import { Platform } from '../enum/platform.enum';

@ObjectType({ description: 'usertask' })
export class UserTask {
  @Field(() => [Keyword], { nullable: true, description: 'keywords' })
  keywords: Array<Keyword>;
  @Field({
    nullable: true,
    description: 'userId',
  })
  userId: string;

  @Field(() => [Platform], {
    nullable: true,
    description: 'platforms',
  })
  platforms: Array<Platform> = [Platform.Youtube, Platform.X, Platform.Reddit];
}
