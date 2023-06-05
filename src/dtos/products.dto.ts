import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsArray, IsEnum, IsOptional } from 'class-validator';

export enum ProductStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public desc: string;

  @IsNumber()
  public price: number;

  @IsEnum(ProductStatus)
  public status: ProductStatus;

  @IsString()
  @IsNotEmpty()
  public brandName: string;

  @IsOptional()
  @IsNumber()
  public categoryId?: number;

  @IsNumber()
  public quantity: number;

  @IsNumber()
  public sold: number;

  @IsString({ each: true })
  public images: string[];
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public desc: string;

  @IsNumber()
  @IsOptional()
  public price: number;

  @IsEnum(ProductStatus)
  @IsOptional()
  public status: ProductStatus;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public brandName: string;

  @IsNumber()
  @IsOptional()
  public categoryId?: number;

  @IsNumber()
  @IsOptional()
  public quantity: number;

  @IsNumber()
  @IsOptional()
  public sold: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public images: string[];
}
