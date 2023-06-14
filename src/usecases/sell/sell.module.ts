import { Module, MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SellController } from './sell.controller';
import { SellService } from './sell.service';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { NestModule } from '@nestjs/common/interfaces';

@Module({
  imports: [],
  controllers: [SellController],
  providers: [SellService, PrismaService],
})
export class SellModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(SellController);
  }
}
