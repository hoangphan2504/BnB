import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsArray, IsEnum, IsOptional } from 'class-validator';


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
}

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public content: string;

  @IsNumber()
  @IsOptional()
  public rating: number;

  
}
