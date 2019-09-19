import { LoggingInterceptor } from './logging.interceptor';
import { Logger } from '@nestjs/common';

describe('LoggingInterceptor', () => {
  const logger: Logger = new Logger();
  it('should be defined', () => {
    expect(new LoggingInterceptor(logger)).toBeDefined();
  });
});
