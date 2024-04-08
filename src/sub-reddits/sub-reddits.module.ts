import { Module } from '@nestjs/common';
import { SubRedditsService } from './sub-reddits.service';
import { SubReddit, SubRedditSchema } from '../schemas/subReddit.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubReddit.name, schema: SubRedditSchema },
    ]),
  ],
  providers: [SubRedditsService],
})
export class SubRedditsModule {}
