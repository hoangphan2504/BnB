import { Router, Request, Response } from 'express';
import { OrderController } from '@/controllers/order.controller';
import { CreateOrderDto } from '@/dtos/order.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AdminCheckMiddleware, AuthMiddleware } from '@/middlewares/auth.middleware';

export class OrderRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public orderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateOrderDto), this.createOrder);
    this.router.get(`${this.path}/:orderId`, AuthMiddleware, this.getOrderById);
  }

  private createOrder = async (req: Request, res: Response) => {
    try {
      const orderId = (req as any).user.orderId; // Assuming you have the authenticated user's ID available in the request

      const createOrderDto: CreateOrderDto = req.body;
      const order = await this.orderController.createOrder(createOrderDto, orderId);

      res.status(201).json({ order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  private getOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.orderId;
      const userId = (req as any).user.userId; // Assuming you have the authenticated user's ID available in the request

      const order = await this.orderController.getOrderById(orderId, userId);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({ order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
