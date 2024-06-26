import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuardGQL } from '../authz/authguardgql';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from './models/user.model';
import { create } from 'domain';

@Resolver()
@UseGuards(AuthGuardGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async user(@CurrentUser() user: any) {
    return {
      user_id: user.sub ?? user.user_id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      nickname: user.nickname,
      email_verified: user.email_verified,
      updated_at: user.updated_at,
    };
    return user;
  }
}

// {
//   iss: "https://citric.eu.auth0.com/",
//   sub: "auth0|666326816196240cfd37b6c7",
//   aud: [
//     "MME-API",
//     "https://citric.eu.auth0.com/userinfo",
//   ],
//   iat: 1718623343,
//   exp: 1718709743,
//   scope: "openid profile email",
//   azp: "GST8ehfA1X4AEQGy6uZGXf6MD82rCoGj",
// }

// {
//   created_at: "2024-06-14T09:59:08.775Z",
//   email: "playgrounduser@test.com",
//   email_verified: false,
//   identities: [
//     {
//       connection: "Username-Password-Authentication",
//       user_id: "666c146c38efe745f00a02bf",
//       provider: "auth0",
//       isSocial: false,
//     },
//   ],
//   name: "playgrounduser@test.com",
//   nickname: "playgrounduser",
//   picture: "https://s.gravatar.com/avatar/539fdc6d8d21f97e968638a57895ae45?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpl.png",
//   updated_at: "2024-06-14T09:59:08.775Z",
//   user_id: "auth0|666c146c38efe745f00a02bf",
// }
