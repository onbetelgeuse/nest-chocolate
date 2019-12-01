import * as Strategy from '@passport-next/passport-openidconnect';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OpenIdConnectAuthOptions } from '../../config/oidc-auth.config';
import { AuthService } from '../auth.service';
import { ODIC_AUTH_OPTIONS } from '../../config/config.constants';

@Injectable()
export class OpenIdConnectStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ODIC_AUTH_OPTIONS)
    private readonly options: OpenIdConnectAuthOptions,
    private readonly authService: AuthService,
    private logger: Logger,
  ) {
    super(
      { ...options },
      async (
        iss: any,
        sub: any,
        profile: any,
        done: (err: any, user: any) => void,
      ) => await this.validate(iss, sub, profile, done),
    );
  }

  public async validate(
    issuer: string,
    sub: string,
    profile: any,
    done: (err: any, user: any) => void,
  ) {
    // const user = await this.authService.validateExternalUser(profile);
    // if (!user) {
    //   return done(new UnauthorizedException(), false);
    // }
    // done(null, user);
  }
}
