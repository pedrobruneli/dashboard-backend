import { IsNotEmpty, IsString, Matches, Length, IsEmail } from 'class-validator';

export class SupplierDTO {
  @IsNotEmpty()
  @IsString()
  corporate_name: string;

  @IsNotEmpty()
  @IsString()
  fantasy_name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp(/^([0-9]{2})9([0-9]{8})$/))
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(14)
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

}
