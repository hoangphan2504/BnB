import { Router } from 'express';
import {  ProductController } from '@/controllers/products.controller';
import { CreateProductDto } from '@/dtos/products.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public user = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getProducts);
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getProductById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateProductDto), this.user.createProduct);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateProductDto, true), this.user.updateProduct);
    this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteProduct);
  }
}
