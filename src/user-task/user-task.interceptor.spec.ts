import { UserTaskInterceptor } from './user-task.interceptor';
import { UserTaskService } from './user-task.service';

describe('UserTaskInterceptor', () => {
  it('should be defined', () => {
    const userTaskServiceMock = {} as UserTaskService;
    expect(new UserTaskInterceptor(userTaskServiceMock)).toBeDefined();
  });
});
