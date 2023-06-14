import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'crypto';
import { GetProductQueryDTO, ProductDTO } from './product.dto';
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

    public async getProducts(query: GetProductQueryDTO) {
        try{
            const { page, limit, search } = query
            const searchNumber = Number(search)
            const [totalPages, products] = await this.prismaService.$transaction(
            [
                this.prismaService.product.count({
                    where: {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                code: {
                                    contains: search,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                qnt_in_stock: {
                                    equals: isNaN(searchNumber) ? undefined : searchNumber
                                }
                            },
                            {
                                sale_price: {
                                    equals: isNaN(searchNumber) ? undefined : searchNumber
                                }
                            },
                            {
                                cost_price: {
                                    equals: isNaN(searchNumber) ? undefined : searchNumber
                                }
                            }
                        ]
                    },
                }),
                this.prismaService.product.findMany({
                    where: {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                code: {
                                    contains: search,
                                    mode: 'insensitive'
                                }
                            },
                             {
                                qnt_in_stock: {
                                    equals: isNaN(searchNumber) ? undefined : searchNumber
                                }
                            },
                            {
                                sale_price: {
                                    equals: isNaN(searchNumber) ? undefined : searchNumber
                                }
                            },
                            {
                                cost_price: {
                                    equals: isNaN(searchNumber) ? undefined : searchNumber
                                }
                            }
                        ]
                    },
                    skip: (parseInt(page) - 1) * parseInt(limit),
                    take: parseInt(limit),
                })
            ]
            )

            return {totalPages, products}
        } catch(err){
            console.log(err)
            throw new InternalServerErrorException('Ocorreu um erro ao tentar buscar os produtos')
        }
    }
}