import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

@Injectable()
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
