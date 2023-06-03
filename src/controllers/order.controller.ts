import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import {  CreateOrderDto } from '@/dtos/order.dto';
import { Order } from '@interfaces/orders.interface';
import { OrderService } from '@services/order.service';

export class OrderController {
  public order = Container.get(OrderService);

  public getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOrdersData: Order[] = await this.order.findAllOrders();

      res.status(200).json({ data: findAllOrdersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId = Number(req.params.id);
      const findOneOrderData: Order = await this.order.findOrderById(orderId);

      res.status(200).json({ data: findOneOrderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData: CreateOrderDto = req.body;
      const createOrderData: Order = await this.order.createOrder(orderData);

      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

//   public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const productId = Number(req.params.id);
//       const productData: CreateOrderDto = req.body;
//       const updateProductData: Order = await this.order.updateOrder(productId, productData);

//       res.status(200).json({ data: updateProductData, message: 'updated' });
//     } catch (error) {
//       next(error);
//     }
//   };

//   public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const productId = Number(req.params.id);
//       const deleteProductData: Order = await this.order.deleteOrder(productId);

//       res.status(200).json({ data: deleteProductData, message: 'deleted' });
//     } catch (error) {
//       next(error);
//     }
//   };
 }
