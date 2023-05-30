export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export interface Order {
  id?: Number;
  userId: Number;
  totalPrices: Number;
  status: OrderStatus;
}
