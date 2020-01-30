import { TokenSession } from '../token-session.entity';

export class TokenSessionDto {
  public readonly id: string;
  public readonly userId: number;

  constructor(values: Partial<TokenSessionDto>) {
    Object.assign(this, values);
  }

  public static fromEntity(entity: TokenSession): TokenSessionDto {
    return new TokenSessionDto({ id: entity.id, userId: entity.userId });
  }

  public static toEntity(token: TokenSessionDto): TokenSession {
    const entity: TokenSession = new TokenSession();
    Object.assign(entity, token);
    return entity;
  }
}
