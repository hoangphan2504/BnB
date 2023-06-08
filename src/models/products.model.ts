import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { Product } from '@/interfaces/products.interface';

export type ProductCreationAttributes = Optional<Product, 'id'>;

export class ProductModel extends Model<Product, ProductCreationAttributes> implements Product {
  public id: number;
  public name: string;
  public desc: string;
  public price: number;
  public brandName: string;
  public importPrice: number;
  public categoryId: string;
  public inventory: number;
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
        type: DataTypes.DECIMAL(10, 2),
      },
      importPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      brandName: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      categoryId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      inventory: {
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
