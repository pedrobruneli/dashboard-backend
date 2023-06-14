import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { PrismaService } from 'src/database/prisma.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [],
  controllers: [SupplierController],
  providers: [SupplierService, PrismaService],
})
export class SupplierModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('suppliers')
  }
}
