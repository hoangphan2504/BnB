import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
export enum TokenType {
  REFRESH = 'refresh',
  ACCESS = 'access',
}
export interface DataStoredInToken {
  id: number;
  role: Role;
  type: TokenType;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface TokenPayload {
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
