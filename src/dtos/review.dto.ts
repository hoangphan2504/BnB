import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
  @IsString()
  public rating: number;

  @IsNotEmpty()
  @IsNumber()
  public productId: number;
}

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public content: string;

  @IsNumber()
  @IsOptional()
  public rating: number;

  @IsNotEmpty()
  @IsNumber()
  public productId: number;

  
}
