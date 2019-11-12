import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { TokenRepository } from './token.repository';
import { mock, instance } from 'ts-mockito';

describe('TokensService', () => {
  let service: TokenService;
  let repository: TokenRepository;

  beforeEach(async () => {
    repository = mock(TokenRepository);
    service = new TokenService(instance(repository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
