import { EnumDataType } from "sequelize";

export enum ProductStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}


export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  status: ProductStatus;
  brand_name: string;
  categories_id: string;
  quantity: number;
  sold: number;
  images: string[];
}
