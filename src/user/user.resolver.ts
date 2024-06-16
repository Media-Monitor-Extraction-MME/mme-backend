import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from 'src/authz/authguardgql';
import { CurrentUser } from './decorators/user.decorator';
import { User } from './models/user.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuardGQL)
  @Query(() => User)
  async user(@CurrentUser() user: any) {
    return user;
  }
}
