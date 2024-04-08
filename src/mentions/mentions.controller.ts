import { Controller, Get } from '@nestjs/common';
import { MentionsService } from './mentions.service';

@Controller('mentions')
export class MentionsController {
  constructor(private readonly mentionsService: MentionsService) {}

  @Get()
  findAll() {
    return this.mentionsService.findAll();
  }
}
