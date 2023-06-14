import { IsNotEmpty, IsString, Matches, Length, IsEmail } from 'class-validator';

export class CustomerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(new RegExp(/^([0-9]{2})([0-9]{8,9})$/))
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(9)
  rg: string;

  @IsNotEmpty()
  @IsString()
  @Length(11)
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  cep: string;
}
