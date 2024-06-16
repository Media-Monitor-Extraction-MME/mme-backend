import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    if (!createTaskDto.userId || !createTaskDto.keywords) {
      return 'Please provide a user ID and keywords';
    }
    return await this.tasksService.create(createTaskDto);
  }

  @Get('recommend/')
  @Get('recommend/:keyword')
  async recommend(@Param('keyword') incompleteKeyword: string) {
    return (
      await this.tasksService.recommendKeywords(incompleteKeyword ?? '')
    ).slice(0, 10);
  }

  @Get('recommend-secondary/')
  @Get('recommend-secondary/:keyword')
  async recommendSecondary(@Param('keyword') keyword?: string) {
    let secondaryKeywords = await this.tasksService.recommendSecondaryKeywords(
      keyword ?? '',
    );
    if (secondaryKeywords.length === 0) {
      const keywords = await this.tasksService.recommendKeywords(keyword ?? '');
      secondaryKeywords = await this.tasksService.recommendSecondaryKeywords(
        keywords[0],
      );
    }

    return secondaryKeywords.slice(0, 10);
  }

  @Get('recommend-excluded/')
  @Get('recommend-excluded/:keyword')
  async recommendExcluded(@Param('keyword') keyword: string) {
    let excludedKeyword = await this.tasksService.recommendExcludedKeywords(
      keyword ?? '',
    );
    if (excludedKeyword.length === 0) {
      const keywords = await this.tasksService.recommendKeywords(keyword ?? '');
      excludedKeyword = await this.tasksService.recommendExcludedKeywords(
        keywords[0],
      );
    }
    return excludedKeyword.slice(0, 10);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
