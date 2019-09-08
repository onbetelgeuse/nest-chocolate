import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenIdConnectAuthOptions {
  constructor(
    public issuer: string,
    public authorizationURL: string,
    public userInfoURL: string,
    public tokenURL: string,
    public clientID: string,
    public clientSecret: string,
    public callbackURL: string,
  ) {}
}
