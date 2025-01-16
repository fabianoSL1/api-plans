import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/userRepositories';
import { JwtService } from '../../domain/services/jwt.service';

const TOKEN_DURATION = 8600;

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly JwtService: JwtService,
  ) {}

  async execute(name: string) {
    let user = await this.userRepository.get(name);

    if (!user) {
      user = new User(name);
      user.registeredAt = new Date();
    }

    user.lastAuth = new Date();

    await this.userRepository.save(user);

    const token = this.JwtService.signIn(user, TOKEN_DURATION);

    return { duration: TOKEN_DURATION, token };
  }
}
