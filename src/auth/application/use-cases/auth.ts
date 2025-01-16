import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/userRepositories';
import { JwtService } from '../../domain/services/jwt.service';

const TOKEN_DURATION = 60 * 15;

/*
 * - Registra um usuario de acordo com o nome
 * - gera token
 * - atualiza lastAuth
 */
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
    const token = this.JwtService.signIn(user, TOKEN_DURATION);

    user.lastAuth = new Date();

    await this.userRepository.save(user);

    return { duration: TOKEN_DURATION, token };
  }
}
