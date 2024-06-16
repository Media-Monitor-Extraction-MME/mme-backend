import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardGQL extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const headers = req.headers;
    const authorization = req.headers['authorization'];

    if (authorization) {
    }
    return req;
  }

  handleRequest(err, user, info, context, status) {
    if (err || !user) {
      const managmentToken = process.env['MANAGEMENT_API'];
      if (!managmentToken) {
        throw new UnauthorizedException();
      }
      const options = {
        method: 'GET',
        url: 'https://citric.eu.auth0.com/api/v2/users-by-email',
        params: { email: 'playgrounduser@test.com' },
        headers: { authorization: `Bearer ${managmentToken}` },
      } as {
        method: string;
        url: string;
        params: { email: string };
        headers: { authorization: string };
      };

      try {
        const user = (async () => {
          const user = await fetch(
            `${options.url}?email=${options.params.email}`,
            {
              method: options.method,
              headers: {
                Authorization: options.headers.authorization,
              },
            },
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              return data;
            });

          if (user) {
            return user;
          }
          throw err || new UnauthorizedException();
        })();

        return user;
      } catch (error) {
        throw error;
      }
    }
    return user;
  }
}
