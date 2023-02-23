import { Types } from 'mongoose';

export interface IAuthUser {
  token: string;
  refreshToken: string;
  email: string;
  type: number;
  id: Types.ObjectId;
}
