import { Token } from '../token.entity';

export class TokenDto {
  public readonly id: string;
  public readonly userId: number;

  constructor(values: Partial<TokenDto>) {
    Object.assign(this, values);
  }

  public static fromEntity(entity: Token): TokenDto {
    return new TokenDto({ id: entity.id, userId: entity.userId });
  }

  public static toEntity(token: TokenDto): Token {
    const entity: Token = new Token();
    Object.assign(entity, token);
    return entity;
  }
}
