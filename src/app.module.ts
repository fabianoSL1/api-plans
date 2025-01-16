import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PlanModule } from './plans/infra/plan.module';
import { APP_FILTER } from '@nestjs/core';
import { GeneralExceptionFilter } from './shared/infra/filters/general.filter';
import { AuthModule } from './auth/infra/auth.module';
import { JwtServiceImpl } from './shared/infra/services/jwt.service';
import { AuthMiddleware } from './shared/infra/middleware/auth.middleware';

@Module({
  imports: [PlanModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
    {
      provide: 'JwtService',
      useClass: JwtServiceImpl,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('plans');
  }
}
