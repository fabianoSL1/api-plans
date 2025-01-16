import { User } from '../entities/user.entity';

export interface UserRepository {
  get(name: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
