import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: [true, 'name is required'] })
  name: string;

  @Prop({ type: String })
  description: string;
}
