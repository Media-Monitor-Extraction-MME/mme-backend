import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserTaskService } from './user-task.service';
import { UserTask } from '../schemas/user-task.schema';

type CurrentUserRequest = Request & {
  user?: any;
  userTask?: Promise<UserTask>;
};
@Injectable()
export class UserTaskInterceptor implements NestInterceptor {
  constructor(private readonly userTaskService: UserTaskService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let req: CurrentUserRequest;
    for (const arg of context.getArgs()) {
      if (arg && arg.req) {
        req = arg.req;
      }
    }

    const user = req.user;
    try {
      const userTask = (async () => {
        return await this.userTaskService.findUserTask(
          user['user_id'] ?? user['sub'],
        );
      })();
      if (userTask) {
        req.userTask = userTask;
      }
      return next.handle();
    } catch (error) {
      console.log('UserTaskInterceptor', error);
    }
  }
}
