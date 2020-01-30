import { TokenSessionController } from './token-session.controller';
import { TokenSessionService } from './token-session.service';
import { mock, instance } from 'ts-mockito';

describe('Tokens Controller', () => {
  let controller: TokenSessionController;
  let service: TokenSessionService;

  beforeEach(async () => {
    service = mock(TokenSessionService);

    controller = new TokenSessionController(instance(service));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
