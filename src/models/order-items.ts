import { OrderItem } from '@/interfaces/order-items.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type OrderItemCreationAttributes = Optional<OrderItem, 'id'>;

export class OrderItemModel extends Model<OrderItem, OrderItemCreationAttributes> implements OrderItem {
  public id: number;
  public quantity: number;
  public product: number;

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
      product: {
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
