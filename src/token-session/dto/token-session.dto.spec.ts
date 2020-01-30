import { TokenSessionDto } from './token-session.dto';

describe('Token.Dto', () => {
  it('should be defined', () => {
    expect(new TokenSessionDto({ id: '1' })).toBeDefined();
  });
});
