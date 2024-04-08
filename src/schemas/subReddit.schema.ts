import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubRedditDocument = HydratedDocument<SubReddit>;

@Schema()
export class SubReddit {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  url: string;
}

export const SubRedditSchema = SchemaFactory.createForClass(SubReddit);
