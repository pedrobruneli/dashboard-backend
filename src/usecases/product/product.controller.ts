import { Body, Controller, Post, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { ProductDTO, ProductQueryDTO } from './product.dto';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    async createProduct(@Res() res: Response, @Body() product: ProductDTO, @Query() supplierId: ProductQueryDTO) {
        await this.productService.createProduct(product, supplierId.supplierId)
        res.status(201).json(product);
    }
}