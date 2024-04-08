import { Injectable } from '@nestjs/common';

@Injectable()
export class MentionsService {
  findAll() {
    return `This action returns all mentions`;
  }
}
