import { Test, TestingModule } from '@nestjs/testing';
import { UserTaskResolver } from './user-task.resolver';

describe('UserTaskResolver', () => {
  let resolver: UserTaskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTaskResolver],
    }).compile();

    resolver = module.get<UserTaskResolver>(UserTaskResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
