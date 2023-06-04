import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminCheckMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, AdminCheckMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/profile`, AuthMiddleware, this.user.getProfile);
    this.router.get(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, this.user.getUserById);
    this.router.post(`${this.path}`, AuthMiddleware, AdminCheckMiddleware, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, AuthMiddleware, AdminCheckMiddleware, this.user.deleteUser);
  }
}
