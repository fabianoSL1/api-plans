import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { InvalidInput } from '../exceptions/invalidInput';
import { NotFound } from '../exceptions/notFound';

@Catch(InvalidInput, NotFound)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidInput | NotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(exception.status).json({
      message: exception.message,
    });
  }
}
