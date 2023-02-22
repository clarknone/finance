import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail, isMobilePhone } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

// export type UserDocument = User | Document;
export type UserDocument = HydratedDocument<Auth>;
export type ResetTokenDocument = HydratedDocument<ResetToken>;

@Schema({ timestamps: true })
export class Auth {
  // @Prop({ type: String, required: [true, 'Full Name is required'] })
  // fullname: string;

  @Prop({
    type: String,
    transform: (val: string) => val && val.toLocaleLowerCase(),
    required: [true, 'Email is required'],
    validate: [
      { validator: isEmail, message: (val) => 'please enter a valid email' },
    ],
  })
  email: string;

  @Prop({
    type: String,
    validate: [
      {
        validator: isMobilePhone,
        message: (val) => 'please enter a valid phone Number',
      },
    ],
  })
  phone: string;

  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;

  @Prop({ type: Number, default: 0 })
  type: number;

  @Prop({ type: Number, default: 0 })
  attempt: number;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: Date })
  last_attempt: Date;
}

@Schema({ timestamps: true })
export class ResetToken {
  @Prop({ type: Types.ObjectId, ref: 'User', unique: true })
  user: Auth;

  @Prop({ type: Number, required: true })
  code: number;

  @Prop({ type: Number, default: 0 })
  attempt: number;

  @Prop({ type: String, default: 'password', enum: ['password'] })
  type: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
export const ResetTokenSchema = SchemaFactory.createForClass(ResetToken);
