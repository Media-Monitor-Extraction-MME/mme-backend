import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId; //Included
  @Prop()
  title?: string; // Included
  @Prop()
  subReddit?: string; // Included
  @Prop({ required: true })
  origin: 'Reddit' | 'X (Twitter)'; // Assume Reddit
  @Prop()
  upvotes: string; // Included
  @Prop()
  description?: string; // Not Included
  @Prop({ required: true })
  url: string; // Included
  @Prop({ required: true })
  time: string; // Not Included could have been
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
  }; // Not included
}

export const PostSchema = SchemaFactory.createForClass(Post);
