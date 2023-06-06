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
  brandName: string;
  categoryId: string;
  quantity: number;
  sold: number;
  images: string[];
}
