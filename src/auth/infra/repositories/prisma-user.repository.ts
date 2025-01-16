import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infra/services/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/userRepositories';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(name: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { name },
    });

    if (!user) {
      return null;
    }

    return user;
  }
  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      create: user,
      update: user,
      where: {
        name: user.name,
      },
    });
  }
}
