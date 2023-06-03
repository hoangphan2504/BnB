import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsArray, IsEnum, IsOptional } from 'class-validator';



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

