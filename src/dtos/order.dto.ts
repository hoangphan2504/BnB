import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class ProductItem {
  @IsNumber()
  public productId: number;

  @IsNumber()
  public quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  @IsOptional()
  public price: number;

  @ValidateNested()
  @Type(() => ProductItem)
  public products: ProductItem[];
}
