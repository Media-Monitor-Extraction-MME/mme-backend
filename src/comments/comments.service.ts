import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Comment } from '../schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async findAll(postId: ObjectId): Promise<Comment[]> {
    return await this.commentModel.find({ post: postId }).exec();
  }
}
