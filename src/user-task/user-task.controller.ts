import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserTaskDto, Platform } from './dto/create-user-task.dto';
import { UserTaskService } from './user-task.service';
import { UpdateUserTaskDto } from './dto/update-user-task.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('user-task')
export class UserTaskController {
  constructor(
    private readonly userTaskService: UserTaskService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUserTask(
    @Body() createOrUpdateDTO: CreateUserTaskDto | UpdateUserTaskDto,
    @Req() request: Request,
  ) {
    const accessToken = request.headers.authorization?.split(' ')[1];
    const user = await this.userService.getUserInfo(accessToken);
    if (createOrUpdateDTO.keywords === undefined) {
      return 'Please provide keywords';
    } else if (createOrUpdateDTO.platforms === undefined) {
      createOrUpdateDTO.platforms = [
        Platform.Youtube,
        Platform.X,
        Platform.Reddit,
      ];
    }
    return this.userTaskService.updateOrCreateUserTask({
      ...createOrUpdateDTO,
      userId: user.sub,
    });
  }
}
