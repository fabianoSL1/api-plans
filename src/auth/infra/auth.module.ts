import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { JwtServiceImpl } from '../../shared/infra/services/jwt.service';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { PrismaService } from '../../shared/infra/services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'JwtService',
      useClass: JwtServiceImpl,
    },
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    PrismaService,
  ],
})
export class AuthModule {}
