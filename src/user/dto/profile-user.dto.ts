import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileUserDto {
  constructor(
    public id: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
  ) {}

  public static fromJson(json: any): ProfileUserDto {
    const profileDto = new ProfileUserDto(
      json.sub,
      json.user_name,
      json.given_name,
      json.family_name,
      json.email,
    );
    return profileDto;
  }
}
