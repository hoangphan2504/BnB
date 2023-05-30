import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@/models/users';
import OrderModel from '@/models/orders';
import { logger } from '@utils/logger';
import OrderItemModel from '@/models/order-items';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
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

export const DB = {
  OrderItem: OrderItemModel(sequelize),
  Order: OrderModel(sequelize),
  User: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
