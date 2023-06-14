import { IsNotEmpty, IsString, Matches, Length, IsEmail, IsNumber, IsOptional, IsNumberString } from 'class-validator';

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


export class CreateProductQueryDTO {
  @IsNotEmpty()
  @IsString()
  supplierId: string
}

export class GetProductQueryDTO {
  @IsString()
  search: string = ''

  @IsNumberString()
  page: string = '1'

  @IsNumberString()
  limit: string = '5'
}