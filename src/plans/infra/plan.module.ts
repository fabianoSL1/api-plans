import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { ProductController } from './controllers/product.controller';
import { PrismaPlanRepository } from './repositories/prisma-plan.repository';
import { PrismaProductRepository } from './repositories/prisma-product.repository';
import { PrismaService } from '../../shared/infra/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from '../../shared/infra/excpetions.filter';

@Module({
  controllers: [PlanController, ProductController],
  providers: [
    {
      provide: 'PlanRepository',
      useClass: PrismaPlanRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    PrismaService,
  ],
})
export class PlanModule {}
