import { IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  public id: Number;

  @IsNotEmpty()
  public productId: Number;

  @IsNotEmpty()
  public orderId: Number;

  @IsNotEmpty()
  public quantity: Number;
}
