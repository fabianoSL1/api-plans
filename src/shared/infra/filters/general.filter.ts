import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    if (exception instanceof HttpException) {
      this.logger.log(
        `'${exception.message}' ${exception.getStatus()} ${request.method} ${request.path}`,
      );

      return response
        .status(exception.getStatus())
        .json({ message: exception.message });
    }

    // Log de erro de todas as exceções que não foram mapeadas em custom ou não são HttpException
    this.logger.error(
      `${request.method} ${request.path} - stack: \n ${exception.stack}`,
    );

    return response.status(500).type('text').send('internal server error');
  }
}
