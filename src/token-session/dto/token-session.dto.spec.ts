import { TokenSessionDto } from './token-session.dto';

describe('Token.Dto', () => {
  it('should be defined', () => {
    expect(new TokenSessionDto('1')).toBeDefined();
  });
});
