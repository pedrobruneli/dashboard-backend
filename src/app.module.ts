import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './usecases/customer/customer.module';
import { ProductModule } from './usecases/product/product.module';
import { SupplierModule } from './usecases/supplier/supplier.module';

@Module({
  imports: [CustomerModule, ProductModule, SupplierModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
