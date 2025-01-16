import { User } from '../entities/user.entity';

export interface JwtService {
  signIn(user: User, duration: number): string;
  validate(token: string): boolean;
}
