import { Service } from 'typedi';
import { DB } from '@database';
import { CreateOrderItemDto } from '@/dtos/order-items.dto';
import { HttpException } from '@/exceptions/httpException';
import { OrderItem } from '@interfaces/order-items.interface';
import { ProductModel } from '@/models/products.model';
import { Sequelize, Op } from 'sequelize';
import { OrderItemModel } from '@/models/order-items.model';

@Service()
export class OrderItemService {
  findAllOrdersItem(): OrderItem[] | PromiseLike<OrderItem[]> {
    throw new Error('Method not implemented.');
  }
  public async findAllOrders(): Promise<OrderItem[]> {
    const allOrdersItem: OrderItem[] = await DB.OrderItem.findAll();
    return allOrdersItem;
  }

  public async findOrderItemById(orderId: number): Promise<OrderItem> {
    const findOrderItem: OrderItem = await DB.OrderItem.findByPk(orderId);
    if (!findOrderItem) throw new HttpException(409, "Order item doesn't exist");

    return findOrderItem;
  }

  public async createOrderItem(orderItemData: CreateOrderItemDto): Promise<OrderItem> {
    const findOrderItem: OrderItem = await DB.OrderItem.findOne({ where: { id: orderItemData.id } });
    if (findOrderItem) throw new HttpException(409, `This order ${orderItemData.id} already exists`);

    const createOrderData: OrderItem = await DB.OrderItem.create(orderItemData);
    return createOrderData;
  }

  public async updateOrderItem(orderItemId: number, orderItemData: CreateOrderItemDto): Promise<OrderItem> {
    const findOrderItem: OrderItem = await DB.OrderItem.findByPk(orderItemId);
    if (!findOrderItem) throw new HttpException(409, "Order doesn't exist");

    await DB.OrderItem.update(orderItemData, { where: { id: orderItemId } });

    const updatedOrderItem: OrderItem = await DB.OrderItem.findByPk(orderItemId);
    return updatedOrderItem;
  }

  public async deleteOrder(orderItemId: number): Promise<OrderItem> {
    const findOrderItem: OrderItem = await DB.OrderItem.findByPk(orderItemId);
    if (!findOrderItem) throw new HttpException(409, "Order doesn't exist");

    await DB.OrderItem.destroy({ where: { id: orderItemId } });

    return findOrderItem;
  }

  public async chartSevenDays(): Promise<OrderItem[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orderItems: OrderItem[] = await DB.OrderItem.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('sum_price')), 'Revenue'],
        [Sequelize.fn('date', Sequelize.col('OrderItemModel.created_at')), 'Date'],
      ],
      include: {
        model: DB.Product,
        attributes: ['category_id'],
      },
      where: Sequelize.where(Sequelize.col('OrderItemModel.created_at'), {
        [Op.lt]: new Date(),
        [Op.gt]: sevenDaysAgo,
      }),
      group: ['Date', 'category_id'],
    });

    return orderItems;
  }
}
