import { Injectable } from '@nestjs/common';
import { CreateSentimentDto } from './dto/create-sentiment.dto';
import { UpdateSentimentDto } from './dto/update-sentiment.dto';

@Injectable()
export class SentimentsService {
  create(createSentimentDto: CreateSentimentDto) {
    return 'This action adds a new sentiment';
  }

  findAll() {
    return `This action returns all sentiments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sentiment`;
  }

  update(id: number, updateSentimentDto: UpdateSentimentDto) {
    return `This action updates a #${id} sentiment`;
  }

  remove(id: number) {
    return `This action removes a #${id} sentiment`;
  }
}
