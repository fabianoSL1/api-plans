import { Module } from '@nestjs/common';
import { PlanModule } from './plans/infra/plan.module';
import { APP_FILTER } from '@nestjs/core';
import { GeneralExceptionFilter } from './shared/infra/GeneralExceptions.filter';

@Module({
  imports: [PlanModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
  ],
})
export class AppModule {}
