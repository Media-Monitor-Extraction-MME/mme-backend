import {
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardGQL extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const authorization = req.headers['authorization'];

    if (authorization) {
    }
    return req;
  }

  private async _getAccessToken(): Promise<string> {
    const clientId = process.env['AUTH0_CLIENT_ID'];
    const clientSecret = process.env['AUTH0_CLIENT_SECRET'];
    const issuerUrl = process.env['AUTH0_ISSUER_URL'];
    const grantType = 'client_credentials';
    try {
      const params = new URLSearchParams();
      params.append('grant_type', grantType);
      params.append('client_id', clientId);
      params.append('client_secret', clientSecret);
      params.append('audience', 'https://citric.eu.auth0.com/api/v2/');

      const token = await fetch(`${issuerUrl}oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })
        .then(async (response) => {
          // console.log(await response.text());
          return response.json();
        })
        .then((data) => {
          return data;
        });

      if (token.error && token.error_description) {
        throw new UnauthorizedException();
      }
      if (token && token.statusCode === undefined) {
        return token.access_token;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw error;
    }
  }

  handleRequest(err, user, info, context: ExecutionContext, status) {
    if (err || !user) {
      try {
        const user = (async () => {
          const accessToken = await this._getAccessToken();

          const user = await fetch(
            `https://citric.eu.auth0.com/api/v2/users-by-email?email=playgrounduser@test.com`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
            .then((response) => response.json())
            .then((data) => {
              return data;
            });
          return user[0];
        })();

        SetMetadata('user', user);

        return user;
      } catch (error) {
        throw error;
      }
    } else {
      const args = context.getArgs();

      const req: Request & { user: any } = args[2].req;
      const authorization = req.headers['authorization'].split(' ')[1];

      try {
        const loggedInUser = (async () => {
          const user = await fetch('https://citric.eu.auth0.com/userinfo', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              return data;
            });
          return user;
        })();
        return loggedInUser;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
    return user;
  }
}
