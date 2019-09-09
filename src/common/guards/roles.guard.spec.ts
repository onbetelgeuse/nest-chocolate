import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { mock } from 'ts-mockito';

describe('RoleGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  beforeEach(() => {
    reflector = mock(Reflector);
    guard = new RolesGuard(reflector);
  });
  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
