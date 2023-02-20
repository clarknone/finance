import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Category } from './category.schema';

@Schema({ timestamps: true })
export class Record {
  @Prop({ type: Types.ObjectId, ref: 'User', require: true })
  user: User | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category', require: true })
  category: Category | Types.ObjectId;

  @Prop({ type: String, default: false, enum: ['credit', 'debit'] })
  type: string;

  @Prop({ type: Number, required: [true, 'amount is required'] })
  amount: number

}
