import { Module } from '@nestjs/common';
import { UserTaskController } from './user-task.controller';
import { UserTaskService } from './user-task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTask, UserTaskSchema } from '../schemas/user-task.schema';
import { TasksModule } from '../tasks/tasks.module';
import { UserService } from '../user/user.service';
import { UserTaskResolver } from './user-task.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTask.name, schema: UserTaskSchema },
    ]),
    TasksModule,
  ],
  controllers: [UserTaskController],
  providers: [UserTaskService, UserService, UserTaskResolver],
  exports: [UserTaskService],
})
export class UserTaskModule {}
