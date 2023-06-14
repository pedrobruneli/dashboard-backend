import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SellDTO } from './sell.dto';
import { randomUUID } from 'crypto';
import { InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class SellService {
  constructor(private readonly prismaService: PrismaService) {}

  public async sell(sell: SellDTO) {
    const costumer = await this.prismaService.customer.findUnique({
      where: {
        id: sell.customerId,
      },
    });
    if (!costumer) throw new NotFoundException('Customer not found.');
    try {
      const sellId = randomUUID();
      const sellCreate = this.prismaService.sell.create({
        data: {
          id: sellId,
          customer_id: sell.customerId,
          created_at: new Date(),
        },
      });
      const sellItemsCreate = sell.products.map((product) => {
        return this.prismaService.sell_Items.create({
          data: {
            id: randomUUID(),
            quantity: product.quantity,
            product_id: product.productId,
            sell_id: sellId,
          },
        });
      });

      await this.prismaService.$transaction([sellCreate, ...sellItemsCreate]);

    } catch (err) {
      throw new InternalServerErrorException(
        'Error while selling, try again later.',
      );
    }
  }
}
