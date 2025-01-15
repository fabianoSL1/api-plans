import { Module } from '@nestjs/common';
import { PlanModule } from './plans/infra/plan.module';

@Module({
  imports: [PlanModule],
})
export class AppModule {}
