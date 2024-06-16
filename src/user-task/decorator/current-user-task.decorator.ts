// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserTask } from 'src/schemas/user-task.schema';

type CurrentUserRequest = Request & {
  user?: any;
  userTask?: Promise<UserTask>;
};
// export function CurrentUserTask() {
//   const injectUserTaskService = Inject(UserTaskService);
//   return (target: any, property: any, propertyDescription: any) => {
//     injectUserTaskService(target, 'userTaskService');
//     const metaUser = Reflect.getMetadata('user', target.constructor);
//     console.log('metaUser', metaUser);

//     const userTaskService: UserTaskService = target.userTaskService;

//     return [{ message: 'fail' }] as any;
//   };
// }
export const CurrentUserTask = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    let req: CurrentUserRequest;
    for (const arg of ctx.getArgs()) {
      if (arg && arg.req) {
        req = arg.req;
        break;
      }
    }

    // const req = ctx.getArgs()[2].req;
    // const req = httpContext.getRequest();

    // const metaUser = getMetaData('user');
    // const metaUser = Reflect.getMetadata('user', target.constructor);
    // const user = req.user;

    // if (!user) {
    //   return null;
    // }
    return await req.userTask;
  },
);
