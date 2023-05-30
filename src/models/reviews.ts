import { Reviews } from '@/interfaces/reviews.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ProductModel } from './products';

export type ReviewsCreationAttributes = Optional<Reviews, 'id'>;

export class ReviewsModel extends Model<Reviews, ReviewsCreationAttributes> implements Reviews {
  public id: number;
  public user_id: number;
  public product_id: number;
  public content: string;
  public rating: number;


  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
}

const initModel = (sequelize: Sequelize): typeof ReviewsModel => {
  ReviewsModel.init(
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      product_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(225),
      },
      rating: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
    },
    {
      tableName: 'reviews',
      timestamps: true,
      sequelize,
    },
  );
  
  return ReviewsModel;
};

export default initModel;
