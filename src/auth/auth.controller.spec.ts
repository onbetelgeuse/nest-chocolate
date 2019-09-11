import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { mock, instance } from 'ts-mockito';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;
  let logger: Logger;

  beforeEach(async () => {
    logger = mock(Logger);
    authService = mock(AuthService);

    controller = new AuthController(instance(authService), instance(logger));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
