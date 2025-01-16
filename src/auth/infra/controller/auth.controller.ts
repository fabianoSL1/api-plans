import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthUseCase } from '../../application/use-cases/get-token';
import { UserRepository } from '../../domain/repositories/userRepositories';
import { JwtService } from '../../domain/services/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('JwtService') private readonly jwtService: JwtService,
  ) {}
  @Post()
  async post(@Body() { name }: { name: string }) {
    if (!name) {
      throw new HttpException('name required', HttpStatus.BAD_REQUEST);
    }

    const authUseCase = new AuthUseCase(this.userRepository, this.jwtService);

    return await authUseCase.execute(name);
  }
}
