import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
export interface DataStoredInToken {
  id: number;
  role: Role;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
