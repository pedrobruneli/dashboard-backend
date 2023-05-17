import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
})
export class CustomerModule {}
