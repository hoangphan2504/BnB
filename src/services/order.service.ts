import { Service } from 'typedi';
import { DB } from '@database';
import { CreateOrderDto } from '@/dtos/order.dto';
import { HttpException } from '@/exceptions/httpException';
import { Order } from '@interfaces/orders.interface';

@Service()
export class OrderService {
  public async findAllOrders(): Promise<Order[]> {
    const allOrders: Order[] = await DB.Order.findAll();
    return allOrders;
  }

  public async findOrderById(orderId: number): Promise<Order> {
    const findOrder: Order = await DB.Order.findByPk(orderId);
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    return findOrder;
  }

  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const findOrder: Order = await DB.Order.findOne({ where: { id: orderData.id } });
    if (findOrder) throw new HttpException(409, `This order ${orderData.id} already exists`);

    const createProductData: Order = await DB.Order.create(orderData);
    return createProductData;
  }

  public async updateOrder(orderId: number, orderData: CreateOrderDto): Promise<Order> {
    const findOrder: Order = await DB.Order.findByPk(orderId);
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    await DB.Order.update(orderData, { where: { id: orderId } });

    const updatedOrder: Order = await DB.Order.findByPk(orderId);
    return updatedOrder;
  }

  public async deleteOrder(orderId: number): Promise<Order> {
    const findOrder: Order = await DB.Order.findByPk(orderId);
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    await DB.Order.destroy({ where: { id: orderId } });

    return findOrder;
  }
}
