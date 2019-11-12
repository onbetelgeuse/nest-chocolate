import { TokensController } from './tokens.controller';
import { TokenService } from './token.service';
import { mock, instance } from 'ts-mockito';

describe('Tokens Controller', () => {
  let controller: TokensController;
  let service: TokenService;

  beforeEach(async () => {
    service = mock(TokenService);

    controller = new TokensController(instance(service));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
