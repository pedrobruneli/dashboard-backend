import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomerDTO } from './customer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'crypto';
@Injectable()
export class CustomerService {
    constructor(private readonly prismaService: PrismaService){}

    public async createCustomer(customer: CustomerDTO) {
        try{
            await this.prismaService.customer.create({
                data: {
                    id: randomUUID(),
                    ...customer
                }
            })
        }catch(err){
            throw new InternalServerErrorException('Ocorreu um erro ao tentar salvar o cliente')
        }
    }
}