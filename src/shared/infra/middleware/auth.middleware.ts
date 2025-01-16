import {
  HttpException,
  HttpStatus,
  Inject,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../../auth/domain/services/jwt.service';

/*
 * Middleware responsavel por bloquear requisições com tokens invalidos
 */
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject('JwtService') private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = this.getToken(authorization);

    if (!this.jwtService.validate(token)) {
      // capturada por shared/infra/filter/general.filter.ts
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    next();
  }

  private getToken(authorization: string) {
    if (!authorization) {
      throw new HttpException(
        'missing authorization header',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!authorization.startsWith('Bearer ')) {
      throw new HttpException(
        "token start with 'Bearer '",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return authorization.split(' ')[1];
  }
}
