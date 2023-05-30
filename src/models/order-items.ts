import { OrderItems } from '@/interfaces/order-items.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type OrderItemCreationAttributes = Optional<OrderItems, 'id'>;

export class OrderItemModel extends Model<OrderItems, OrderItemCreationAttributes> implements OrderItems {
  public id: number;
  public orderId: number;
  public productId: number;
  public quantity: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

const initModel = (sequelize: Sequelize): typeof OrderItemModel => {
  OrderItemModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'order_items',
      timestamps: true,
      sequelize,
    },
  );

  return OrderItemModel;
};

export default initModel;
