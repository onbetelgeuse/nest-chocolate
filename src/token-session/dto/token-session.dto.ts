import { TokenSession } from '../token-session.entity';

export class TokenSessionDto {
  public readonly id: string;
  public readonly userId: number;
  public readonly revoked: boolean;

  constructor(values: Partial<TokenSessionDto>) {
    Object.assign(this, values);
  }

  public static fromEntity(entity: TokenSession): TokenSessionDto {
    if (entity) {
      return new TokenSessionDto({
        id: entity.id,
        userId: entity.userId,
        revoked: entity.revoked,
      });
    }
  }

  public static toEntity(token: TokenSessionDto): TokenSession | null {
    if (token) {
      const entity: TokenSession = new TokenSession();
      Object.assign(entity, token);
      return entity;
    }
  }
}
