import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class RegisterUserDto {
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

  @IsBoolean()
  readonly isSuperAdmin?: boolean;
}
