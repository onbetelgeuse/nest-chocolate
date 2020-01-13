import { PassportStrategy } from '@nestjs/passport';
import { LdapAuthOptions } from '../../config/ldap-auth.config';
import { Inject, Injectable, Logger } from '@nestjs/common';
import * as Strategy from 'passport-ldapauth';
import { LDAP_AUTH_OPTIONS } from '../../config/config.constants';

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldapauth') {
  constructor(
    @Inject(LDAP_AUTH_OPTIONS) public readonly options: LdapAuthOptions,
    private readonly logger: Logger,
  ) {
    super((req: any, callback: (err: any, result: any) => void) => {
      const opts = {
        server: {
          ...options,
        },
      };
      callback(null, opts);
    });
  }

  public async validate(user: any, done: (error, user) => void): Promise<any> {
    this.logger.log(user);

    done(null, user);
  }
}
