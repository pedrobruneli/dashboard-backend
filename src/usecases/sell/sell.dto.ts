import { Type } from "class-transformer";
import { ArrayMinSize, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class SellDTO {
    @IsNotEmpty()
    @IsString()
    public readonly customerId: string

    @IsNotEmpty()
    @ArrayMinSize(1)
    @Type(() => ProductSellDTO)
    @ValidateNested({each: true})
    public readonly products: ProductSellDTO[]
}

export class ProductSellDTO {
    @IsNotEmpty()
    @IsString()
    public readonly productId: string

    @IsNotEmpty()
    @IsNumber()
    public readonly quantity: number
}