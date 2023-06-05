import { Service } from 'typedi';
import { DB } from '@database';
import { CreateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@/exceptions/httpException';
import { Order } from '@interfaces/orders.interface';
import { OrderItem } from '@/interfaces/order-items.interface';

@Service()
export class OrderService {
  public async findAllOrders(): Promise<Order[]> {
    const allOrders: Order[] = await DB.Order.findAll();
    return allOrders;
  }

  public async findAllOrdersByUserId(userId: number): Promise<Order[]> {
    const allOrders: Order[] = await DB.Order.findAll({
      where: {
        userId,
      },
      include: [DB.OrderItem],
    });
    return allOrders;
  }

  public async findOrderById(orderId: number): Promise<Order> {
    const findOrder: Order = await DB.Order.findByPk(orderId);
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    return findOrder;
  }

  public async createOrder(orderData: CreateOrderDto, userId: number): Promise<Order> {
    try {
      const result = await DB.sequelize.transaction(async t => {
        const createdOrder: Order = await DB.Order.create(
          {
            userId,
          },
          { transaction: t },
        );

        const orderItems: OrderItem[] = await Promise.all(
          orderData.products.map(async item => {
            const product = await DB.Product.findByPk(item.productId, {
              transaction: t,
            });

            return {
              productId: item.productId,
              orderId: createdOrder.id,
              quantity: item.quantity,
              sumPrice: item.quantity * product.price,
            };
          }),
        );

        await DB.OrderItem.bulkCreate(orderItems, { transaction: t });

        return createdOrder;
      });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateOrder(orderId: number, orderData: CreateOrderDto): Promise<Order> {
    const findOrder: Order = await DB.Order.findByPk(orderId);
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    // await DB.Order.update(orderData, { where: { id: orderId } });

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
