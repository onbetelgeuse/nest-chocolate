import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import { User } from '../../user/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsEmail({ require_tld: false })
  readonly email: string;

  @IsArray()
  readonly roles: string[];

  public static toEntity(user: CreateUserDto): User {
    const entity: User = new User();
    entity.username = user.username;
    entity.email = user.email;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.setPassword(user.password);
    entity.externalId = null;
    return entity;
  }
}
