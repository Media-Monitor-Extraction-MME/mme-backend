import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserTask } from './user-task.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  _id: ObjectId;
  @Prop({
    required: true,
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: 'UserTask',
  })
  userTasks: Array<UserTask>;
  @Prop({
    required: true,
    type: raw({
      keyword: { type: String },
      secondaryKeywords: { type: [String] },
      excludedKeywords: { type: [String] },
    }),
  })
  task: {
    keyword: string;
    secondaryKeywords?: string[];
    excludedKeywords?: string[];
  };
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
