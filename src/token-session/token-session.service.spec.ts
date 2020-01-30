import { Test, TestingModule } from '@nestjs/testing';
import { TokenSessionService } from './token-session.service';
import { TokenSessionRepository } from './token-session.repository';
import { mock, instance } from 'ts-mockito';

describe('TokensService', () => {
  let service: TokenSessionService;
  let repository: TokenSessionRepository;

  beforeEach(async () => {
    repository = mock(TokenSessionRepository);
    service = new TokenSessionService(instance(repository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
