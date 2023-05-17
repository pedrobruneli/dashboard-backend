import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'crypto';
import { ProductDTO } from './product.dto';
@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService){}

    public async createProduct(product: ProductDTO, supplierId: string) {
        try{
            const supplier = await this.prismaService.supplier.findUnique({
                where: {
                    id: supplierId
                }
            })
            if(!supplier){
                throw new NotFoundException('O fornecedor informado não existe')
            }
            await this.prismaService.product.create({
                data: {
                    id: randomUUID(),
                    supplier_id: supplierId,
                    ...product
                }
            })
        } catch(err){
            console.log(err)
            if(err instanceof NotFoundException){
                throw err
            }
            throw new InternalServerErrorException('Ocorreu um erro ao tentar salvar o produto')
        }
    }
}