import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsArray, IsEnum, IsOptional } from 'class-validator';



export class CreateOrderDto {
  @IsNotEmpty()
  public id: Number;

  @IsNotEmpty()
  public userId: Number;

  @IsNotEmpty()
  public totalPrices: Number;

  @IsNumber()
  public price: number;

}

