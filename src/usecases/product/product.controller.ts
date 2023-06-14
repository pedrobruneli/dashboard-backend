import { Body, Controller, Post, Res, Query, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductQueryDTO, GetProductQueryDTO, ProductDTO } from './product.dto';

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Post()
    async createProduct(@Res() res: Response, @Body() product: ProductDTO, @Query() supplierId: CreateProductQueryDTO) {
        await this.productService.createProduct(product, supplierId.supplierId)
        res.status(201).json(product);
    }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async getProducts(@Res() res: Response, @Query() query: GetProductQueryDTO) {
        const products = await this.productService.getProducts(query)
        res.status(200).json(products);
    }
}