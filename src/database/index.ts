import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PASS } from '@config';
import UserModel from '@/models/users';
import OrderModel from '@/models/orders';
import ProductModel from '@/models/products';
import ReviewsModel from '@/models/reviews';
import CategoriesModel from '@/models/categories';

import OrderItemModel from '@/models/order-items';
import { logger } from '@/utils/logger';

console.log(DB_DATABASE, DB_USER, DB_PASSWORD, DB_PASS);

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  timezone: '+07:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const initAllModels = (sequelize: Sequelize.Sequelize) => {
  const Reviews = ReviewsModel(sequelize);
  const OrderItem = OrderItemModel(sequelize);
  const Product = ProductModel(sequelize);
  const Categories = CategoriesModel(sequelize);
  const Order = OrderModel(sequelize);
  const User = UserModel(sequelize);

  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });

  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  Product.hasMany(Reviews, { foreignKey: 'productId' });
  Reviews.belongsTo(Product, { foreignKey: 'productId' });

  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  return {
    Reviews,
    OrderItem,
    Product,
    Categories,
    Order,
    User,
  };
};

export const DB = {
  ...initAllModels(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
