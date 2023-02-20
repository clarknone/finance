import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Auth {
  @Prop({ type: String, required: [true, 'message is required'] })
  email: string;

  @Prop({ type: Boolean, default: false })
  password: boolean;
}
