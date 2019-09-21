import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { mock, instance } from 'ts-mockito';

describe('Tokens Controller', () => {
  let controller: TokensController;
  let service: TokensService;

  beforeEach(async () => {
    service = mock(TokensService);

    controller = new TokensController(instance(service));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
