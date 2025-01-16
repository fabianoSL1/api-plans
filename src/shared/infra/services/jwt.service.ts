import { Injectable } from '@nestjs/common';
import { User } from '../../../auth/domain/entities/user.entity';
import { JwtService } from '../../../auth/domain/services/jwt.service';
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET ?? 'secret';

@Injectable()
export class JwtServiceImpl implements JwtService {
  signIn(user: User, duration: number): string {
    return jwt.sign(user, SECRET, { expiresIn: duration });
  }

  validate(token: string): boolean {
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch {
      return false;
    }
  }
}
