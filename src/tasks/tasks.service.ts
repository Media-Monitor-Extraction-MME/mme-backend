import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserTask } from '../schemas/user-task.schema';
import { Task } from '../schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}
  async create(createTaskDto: CreateTaskDto) {
    const userTask = await this.taskModel.create({
      userId: createTaskDto.userId,
      keywords: createTaskDto.keywords,
    });
    return userTask;
  }

  async recommendKeywords(incompleteKeyword: string) {
    const tasks = await this.taskModel.find({
      'task.keyword': { $regex: new RegExp(incompleteKeyword, 'i') },
    });
    return tasks
      .sort((a, b) => {
        return a.userTasks.length > b.userTasks.length ? -1 : 1;
      })
      .map((task) => task.task.keyword);
  }

  async recommendSecondaryKeywords(keyword: string) {
    const tasks = await this.taskModel.find({
      'task.keyword': { $regex: new RegExp(keyword, 'i') },
    });
    return tasks
      .sort((a, b) => {
        return a.userTasks.length > b.userTasks.length ? -1 : 1;
      })
      .map((task) => task.task.secondaryKeywords)
      .flat();
  }

  async recommendExcludedKeywords(keyword: string) {
    const tasks = await this.taskModel.find({
      'task.keyword': { $regex: new RegExp(keyword, 'i') },
    });
    return tasks
      .sort((a, b) => {
        return a.userTasks.length > b.userTasks.length ? -1 : 1;
      })
      .map((task) => task.task.excludedKeywords)
      .flat();
  }
  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, taskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async findTaskForKeywords(task: Task['task']) {
    return await this.taskModel.findOne({
      'task.keyword': task.keyword,
    });
  }

  async findTaskForUserTask(userTask: UserTask) {
    return await this.taskModel.find({ userTasks: { $in: [userTask._id] } });
  }

  async createTasksFromUserTask(userTask: UserTask) {
    // Find all tasks that are related to current user...
    const tasks = await this.findTaskForUserTask(userTask);

    // Check each task to see if it is still relevant to the user
    tasks.forEach(async (task) => {
      if (
        !userTask.keywords.includes({
          keyword: task.task.keyword,
          secondaryKeywords: task.task.secondaryKeywords,
          excludedKeywords: task.task.excludedKeywords,
        })
      ) {
        console.log(userTask.keywords, task.task);
        if (task.userTasks.length === 1) {
          // If the task is no longer relevant and has no other users, remove it
          await this.taskModel.findByIdAndDelete(task._id);
        } else {
          //If the task is no longer relevant but has other users, remove the user from the task
          await this.taskModel.findByIdAndUpdate(task._id, {
            $pull: { userTasks: userTask._id },
          });
        }
      }
    });

    userTask.keywords.forEach(async (keyword) => {
      // Skip all tasks that already exist with these keywords...
      if (tasks.find((task) => task.task === keyword)) {
        return;
      }

      // Search if task already exists with these keywords for a different user.
      const existingTask = await this.findTaskForKeywords(keyword);

      if (existingTask) {
        // If task exists, add user to task
        await this.taskModel.findByIdAndUpdate(existingTask._id, {
          $push: { userTasks: userTask._id },
          updatedAt: new Date(),
        });
        return;
      }
      // Create a new task with these keywords
      const newTask = await this.taskModel.create({
        userTasks: [userTask._id],
        task: {
          keyword: keyword.keyword,
          secondaryKeywords: keyword.secondaryKeywords ?? [],
          excludedKeywords: keyword.excludedKeywords ?? [],
        },
      });
      console.log(newTask);
    });
  }
}
