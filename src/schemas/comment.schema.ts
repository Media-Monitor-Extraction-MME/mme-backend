import { SubReddit } from './subReddit.schema';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';
import { ObjectId } from 'mongodb';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  parentId?: ObjectId;
  @Prop()
  comment: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubReddit' })
  subReddit?: SubReddit;
  @Prop({ required: true })
  upvotes: number;
  @Prop({ required: true })
  time: string;
  @Prop(
    raw({
      positive: { type: Number, default: 0 },
      negative: { type: Number, default: 0 },
      neutral: { type: Number, default: 0 },
    }),
  )
  sentiment?: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
