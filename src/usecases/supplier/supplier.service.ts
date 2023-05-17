import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'crypto';
import { SupplierDTO } from './supplier.dto';
@Injectable()
export class SupplierService {
    constructor(private readonly prismaService: PrismaService){}

    public async createSupplier(supplier: SupplierDTO) {
        try{
            await this.prismaService.supplier.create({
                data: {
                    id: randomUUID(),
                    ...supplier
                }
            })
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException('Ocorreu um erro ao tentar salvar o fornecedor')
        }
    }

    public async getSuppliers() {
        try{
            return await this.prismaService.supplier.findMany()
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException('Ocorreu um erro ao tentar buscar os fornecedores')
        }
    }
}