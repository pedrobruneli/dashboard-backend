import { IsNotEmpty, IsString, Matches, Length, IsEmail, IsNumber } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  cost_price: number;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  sale_price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  qnt_in_stock: number;
}


export class ProductQueryDTO {
  @IsNotEmpty()
  @IsString()
  supplierId: string
}