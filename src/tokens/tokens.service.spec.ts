import { Test, TestingModule } from '@nestjs/testing';
import { TokensService } from './tokens.service';
import { TokenRepository } from './token.repository';
import { mock, instance } from 'ts-mockito';

describe('TokensService', () => {
  let service: TokensService;
  let repository: TokenRepository;

  beforeEach(async () => {
    repository = mock(TokenRepository);
    service = new TokensService(instance(repository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
