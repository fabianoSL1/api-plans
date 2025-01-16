import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PlanController } from './controllers/plan.controller';
import { ProductController } from './controllers/product.controller';
import { PrismaPlanRepository } from './repositories/prisma-plan.repository';
import { PrismaProductRepository } from './repositories/prisma-product.repository';
import { PrismaService } from '../../shared/infra/services/prisma.service';
import { CustomExceptionFilter } from '../../shared/infra/filters/custom.filter';

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
