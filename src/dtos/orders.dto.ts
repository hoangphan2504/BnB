import { Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class ProductItem {
  @IsNumber()
  public productId: number;

  @IsNumber()
  public quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => ProductItem)
  public products: ProductItem[];
}
