import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { CustomerModule } from './usecases/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
