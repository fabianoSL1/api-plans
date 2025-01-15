import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { NotFound } from '../exceptions/notFound';
import { InvalidInput } from '../exceptions/invalidInput';

export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const [status, message] = this.get(exception);

    response.status(status);

    if (message) {
      return response.json({
        message,
      });
    }

    return response.send('Internal server error');
  }

  private get(exception: any): [number, string | null] {
    if (exception instanceof HttpException) {
      return [exception.getStatus(), exception.message];
    }
    if (exception instanceof NotFound) {
      return [404, exception.message];
    }

    if (exception instanceof InvalidInput) {
      return [400, exception.message];
    }

    return [500, null];
  }
}
