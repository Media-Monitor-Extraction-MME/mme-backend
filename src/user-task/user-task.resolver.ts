import { Query, Resolver } from '@nestjs/graphql';
import { UserTask } from './model/user-task.model';
import { UserTaskService } from './user-task.service';
import { CurrentUserTask } from './decorator/current-user-task.decorator';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { UserTaskInterceptor } from './user-task.interceptor';
import { AuthGuardGQL } from '../authz/authguardgql';

@Resolver()
@UseGuards(AuthGuardGQL)
@UseInterceptors(UserTaskInterceptor)
export class UserTaskResolver {
  constructor(private readonly userTaskService: UserTaskService) {}
  @Query(() => UserTask, { nullable: true })
  async userTask(@CurrentUserTask() userTask: UserTask): Promise<UserTask> {
    return userTask ?? null;
  }
}
