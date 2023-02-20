import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/entities/auth.entity';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId, ref: 'User', require: true })
  auth: Auth | Types.ObjectId;

  @Prop({ type: String })
  fullname: string;
}
