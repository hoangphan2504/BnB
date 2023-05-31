import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { OrderItemModel } from './order-items';
import { Product, ProductStatus } from '@/interfaces/products.interface';
import { ReviewsModel } from './reviews';

export type ProductCreationAttributes = Optional<Product, 'id'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id: number;
  public name: string;
  public desc: string;
  public price: number;
  public status: ProductStatus;
  public brand_name: string;
  public categories_id: string;
  public quantity: number;
  public sold: number;
  public images: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

const initModel = (sequelize: Sequelize): typeof ProductModel => {
  ProductModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      desc: {
        allowNull: false,
        type: DataTypes.STRING(225),
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: [
          ProductStatus.PENDING,
          ProductStatus.CONFIRMED,
          ProductStatus.CANCELLED,
          ProductStatus.DELIVERED,
          ProductStatus.RETURNED,
          ProductStatus.PAID,
          ProductStatus.UNPAID,
        ],
      },
      brand_name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      categories_id: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      sold: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      images: {
        allowNull: false,
        type: DataTypes.STRING(225),
      },
    },
    {
      tableName: 'products',
      timestamps: true,
      paranoid: true,
      sequelize,
    },
  );

  return ProductModel;
};

export default initModel;
