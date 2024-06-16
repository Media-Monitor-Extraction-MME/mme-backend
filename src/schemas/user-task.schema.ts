import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Platform } from 'src/user-task/dto/create-user-task.dto';

export type UserTaskDocument = HydratedDocument<UserTask>;

@Schema()
export class UserTask {
  _id: ObjectId;
  @Prop({ required: true, unique: true })
  userId: string;
  @Prop({
    required: true,
    ...raw(
      Array<{
        keyword: { type: string };
        secondaryKeywords?: { type: string[] }; // Fix: Change { type: string[] } to [String]
        excludedKeywords?: { type: string[] }; // Fix: Change { type: string[] } to [String]
      }>,
    ),
  })
  keywords: Array<{
    keyword: string;
    secondaryKeywords?: string[];
    excludedKeywords?: string[];
  }>;
  @Prop({ required: true, type: [String] })
  platforms: Platform[];
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserTaskSchema = SchemaFactory.createForClass(UserTask);
