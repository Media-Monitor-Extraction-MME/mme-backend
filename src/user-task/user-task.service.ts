import { UserTask } from '../schemas/user-task.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user-task.dto';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectModel('UserTask') private readonly userTaskModel: Model<UserTask>,
    private readonly taskService: TasksService,
  ) {}

  async updateOrCreateUserTask(
    dto: CreateUserTaskDto | UpdateUserTaskDto,
  ): Promise<UserTask> {
    try {
      let userTask: UserTask;
      if ((await this.findUserTask(dto.userId)) !== null) {
        userTask = await this.updateUserTask(dto as UpdateUserTaskDto);
      } else {
        userTask = await this.createUserTask(dto as CreateUserTaskDto);
      }

      this.taskService.createTasksFromUserTask(userTask);
      return userTask;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async findUserTask(userId: string): Promise<UserTask | undefined> {
    const userTask = await this.userTaskModel.findOne({ userId });
    return userTask;
  }
  private async updateUserTask(dto: UpdateUserTaskDto): Promise<UserTask> {
    return await this.userTaskModel.findOneAndUpdate(
      { userId: dto.userId },
      { keywords: dto.keywords, platforms: dto.platforms },
      { new: true },
    );
  }
  private async createUserTask(dto: CreateUserTaskDto): Promise<UserTask> {
    const platforms = dto.platforms ?? [];
    return await this.userTaskModel.create({
      userId: dto.userId,
      keywords: dto.keywords,
      platforms: platforms,
    });
  }
}
