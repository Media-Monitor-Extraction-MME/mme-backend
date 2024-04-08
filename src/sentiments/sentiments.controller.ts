import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { CreateSentimentDto } from './dto/create-sentiment.dto';
import { UpdateSentimentDto } from './dto/update-sentiment.dto';

@Controller('sentiments')
export class SentimentsController {
  constructor(private readonly sentimentsService: SentimentsService) {}

  @Post()
  create(@Body() createSentimentDto: CreateSentimentDto) {
    return this.sentimentsService.create(createSentimentDto);
  }

  @Get()
  findAll() {
    return this.sentimentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sentimentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSentimentDto: UpdateSentimentDto) {
    return this.sentimentsService.update(+id, updateSentimentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sentimentsService.remove(+id);
  }
}
