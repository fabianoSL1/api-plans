import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { InvalidInput } from '../exceptions/invalidInput';
import { NotFound } from '../exceptions/notFound';
import { Request } from 'express';

@Catch(InvalidInput, NotFound)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: InvalidInput | NotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    this.logger.log(
      `[${exception.constructor.name}] '${exception.message}' ${exception.status} ${request.method} ${request.path}`,
    );

    return response.status(exception.status).json({
      message: exception.message,
    });
  }
}
