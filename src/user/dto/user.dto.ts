import { User } from '../user.entity';

export class UserDto {
  constructor(
    public id: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public roles: string[],
    public active: boolean,
    public externalId?: string,
  ) {}

  public static fromEntity(user: User): UserDto {
    return new UserDto(
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.roles ? user.roles.map(x => x.name) : [],
      user.active,
      user.externalId,
    );
  }
}
