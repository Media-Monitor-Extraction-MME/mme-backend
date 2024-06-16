// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type CurrentUserRequest = Request & { user?: any };
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // const httpContext = ctx.switchToHttp();

    let req: CurrentUserRequest;
    for (const arg of ctx.getArgs()) {
      if (arg && arg.req) {
        req = arg.req;
        break;
      }
    }
    // const req = ctx.getArgs()[2].req;
    // const req = httpContext.getRequest();

    const user = req.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user[0];
  },
);
