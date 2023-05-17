import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SupplierService } from './supplier.service';
import { SupplierDTO } from './supplier.dto';

@Controller('suppliers')
export class SupplierController {

    constructor(private readonly supplierService: SupplierService){}

    @Post()
    async createSupplier(@Res() res: Response, @Body() supplier: SupplierDTO) {
        await this.supplierService.createSupplier(supplier)
        res.status(201).json(supplier);
    }

    @Get()
    async getSuppliers(@Res() res: Response) {
        const suppliers = await this.supplierService.getSuppliers()
        res.status(200).json(suppliers)
    }
}