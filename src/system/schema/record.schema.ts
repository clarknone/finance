import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Category } from './category.schema';

@Schema({ timestamps: true })
export class Record {
  @Prop({ type: Types.ObjectId, ref: 'User', require: true })
  user: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category', require: true })
  category: Category | Types.ObjectId;

  @Prop({ type: String, default: 'debit', enum: ['credit', 'debit'] })
  type: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Number, required: [true, 'amount is required'] })
  amount: number;
}

export type RecordDocument = HydratedDocument<Record>;
export const RecordSchema = SchemaFactory.createForClass(Record);
