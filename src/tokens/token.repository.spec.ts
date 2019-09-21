import { TokenRepository } from './token.repository';

describe('Token.Repository', () => {
  it('should be defined', () => {
    expect(new TokenRepository()).toBeDefined();
  });
});
