import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Auth {
  @Prop({ type: String, required: [true, 'message is required'] })
  email: string;

  @Prop({ type: Boolean, default: false })
  password: boolean;
}

export type AuthDocument = HydratedDocument<Auth>;
export const AuthSchema = SchemaFactory.createForClass(Auth);
