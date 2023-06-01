import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  public fullname: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  public phone: string;

  @IsDate()
  @IsOptional()
  public dob: Date;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @MaxLength(45)
  @IsOptional()
  public fullname: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  public phone: string;

  @IsDate()
  @IsOptional()
  public dob: Date;
}
