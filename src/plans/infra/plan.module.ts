import { Module } from '@nestjs/common';
import { PlanController } from './controllers/plan.controller';
import { ProductController } from './controllers/product.controller';
import { PrismaPlanRepository } from './repositories/prisma-plan.repository';
import { PrismaProductRepository } from './repositories/prisma-product.repository';
import { PrismaService } from '../../shared/infra/prisma.service';

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
    PrismaService,
  ],
})
export class PlanModule {}
