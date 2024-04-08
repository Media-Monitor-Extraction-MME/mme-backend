import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async findAll({ keyword }: { keyword: string }): Promise<Post[]> {
    return (await this.postModel.find().exec()).filter((post) => {
      if (post.title === undefined || post.description === undefined)
        return false;

      if (post.title === undefined) return post.description.includes(keyword);
      if (post.description === undefined) return post.title.includes(keyword);
      return post.title.includes(keyword) || post.description.includes(keyword);
    });
  }
}
