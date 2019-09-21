import { Token } from '../token.entity';

export class TokenDto {
  constructor(public readonly id: string) {}

  public static fromEntity(entity: Token): TokenDto {
    return new TokenDto(entity.id);
  }
}
