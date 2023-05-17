import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomerDTO } from 'src/usecases/customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {

    constructor(private readonly customerService: CustomerService){}

    @Post()
    async createCustomer(@Res() res: Response, @Body() customer: CustomerDTO) {
        await this.customerService.createCustomer(customer)
        res.status(201).json(customer);
    }
}