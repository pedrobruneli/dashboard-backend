import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CustomerModule } from './usecases/customer/customer.module';
import { ProductModule } from './usecases/product/product.module';
import { SupplierModule } from './usecases/supplier/supplier.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './usecases/user/auth.module';
import { SellModule } from './usecases/sell/sell.module';

@Module({
  imports: [CustomerModule, ProductModule, SupplierModule, AuthModule, SellModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '2h'}
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
