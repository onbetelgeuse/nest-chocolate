import { Test, TestingModule } from '@nestjs/testing';
import { TokenSessionService } from './token-session.service';
import { TokenSessionRepository } from './token-session.repository';
import { mock, instance } from 'ts-mockito';
import { ConfigService } from '../config/config.service';

describe('TokensService', () => {
  let service: TokenSessionService;
  let repository: TokenSessionRepository;
  let config: ConfigService;

  beforeEach(async () => {
    repository = mock(TokenSessionRepository);
    config = mock(ConfigService);
    service = new TokenSessionService(instance(repository), instance(config));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
