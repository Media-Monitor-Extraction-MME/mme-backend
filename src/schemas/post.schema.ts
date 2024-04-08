import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SubReddit } from './subReddit.schema';
import { ObjectId } from 'mongodb';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;
  @Prop()
  title?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubReddit' })
  subReddit?: SubReddit;
  @Prop({ required: true })
  origin: 'Reddit' | 'X (Twitter)';
  @Prop()
  upvotes: string;
  @Prop()
  description?: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  time: string;
  @Prop(
    raw({
      positive: { type: Number, default: 0 },
      negative: { type: Number, default: 0 },
      neutral: { type: Number, default: 0 },
    }),
  )
  collectiveSentiment?: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);
