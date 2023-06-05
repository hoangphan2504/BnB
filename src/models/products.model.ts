import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Product, ProductStatus } from '@/interfaces/products.interface';

export type ProductCreationAttributes = Optional<Product, 'id'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id: number;
  public name: string;
  public desc: string;
  public price: number;
  public status: ProductStatus;
  public brandName: string;
  public categoryId: string;
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
      brandName: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
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
        allowNull: true,
        type: DataTypes.JSON,
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
