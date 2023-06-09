import { DB } from '@/database';
import { Role } from '@/interfaces/auth.interface';
import { Op } from 'sequelize';
import { Service } from 'typedi';

@Service()
export class GeneralService {
  public async getStatistics() {
    const { Sequelize, Product, Order, OrderItem, User } = DB;
    const sevenDaysAgo = new Date(); // new Date() trả về cái gì)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); //setDate là gì 

    const totalProducts = await Product.count(); // có hàm count để đếm 
    const totalOrders = await Order.findAll({ 
      attributes: [
        [Sequelize.fn('date', Sequelize.col('created_at')), 'Date'], // para thứ nhất là gì, para thứ 2 là lấy cột nào, para thứ 3 chắc là tên của cột đó
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'TotalOrders'],
      ],
      where: Sequelize.where(Sequelize.col('created_at'), {
        [Op.lt]: new Date(),
        [Op.gt]: sevenDaysAgo, 
      }),
      group: ['Date'],
      order: [[Sequelize.col('Date'), 'ASC']],
    });

    const totalProfit = await OrderItem.findAll({
      attributes: [
        [Sequelize.fn('date', Sequelize.col('OrderItemModel.created_at')), 'Date'],
        [Sequelize.literal(`sum(sum_price)`), 'revenue'],
        [Sequelize.literal(`sum(sum_price) - sum(import_price*quantity)`), 'profit'],
      ],
      include: {
        model: Product,
        attributes: [],
      },
      where: Sequelize.where(Sequelize.col('OrderItemModel.created_at'), {
        [Op.lt]: new Date(),
        [Op.gt]: sevenDaysAgo,
      }),
      group: ['Date'],
      order: [[Sequelize.col('Date'), 'ASC']],
    });

    const totalCustomer = await User.count({
      where: {
        role: Role.CUSTOMER,
      },
    });

    return {
      totalProducts,
      totalCustomer,
      totalOrders,
      totalProfit,
    };
  }

  public async getRevenueByCategory() {
    const { Sequelize, OrderItem } = DB;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const orderItems = await OrderItem.findAll({
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
