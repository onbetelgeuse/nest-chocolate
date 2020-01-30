import { TokenSessionRepository } from './token-session.repository';

describe('Token.Repository', () => {
  it('should be defined', () => {
    expect(new TokenSessionRepository()).toBeDefined();
  });
});
