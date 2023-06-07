import { OrderStatus } from '@/interfaces/orders.interface';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

export class ProductItem {
  @IsNumber()
  public productId: number;

  @IsNumber()
  public quantity: number;
}

export class CreateOrderDto {
  @IsString()
  public receiptAddress?: string;

  @IsString()
  public receiptName?: string;

  @IsString()
  public receiptPhone?: string;

  @ValidateNested()
  @Type(() => ProductItem)
  public products: ProductItem[];
}

export class UpdateOrderDto {
  @IsString()
  public receiptAddress?: string;

  @IsString()
  public receiptName?: string;

  @IsString()
  public receiptPhone?: string;

  @IsEnum(OrderStatus)
  public status?: OrderStatus;
}
