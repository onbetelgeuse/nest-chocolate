import { TokenDto } from './token.dto';

describe('Token.Dto', () => {
  it('should be defined', () => {
    expect(new TokenDto('1')).toBeDefined();
  });
});
