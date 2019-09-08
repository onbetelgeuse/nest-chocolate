import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@Injectable()
export class LoginUserDto {
  @IsString()
  @IsEmail({ require_tld: false })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
