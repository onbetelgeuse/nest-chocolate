import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

const LdapAuthOptionsProvider = {
  provide: 'LDAP_AUTH_OPTIONS',
  useFactory: (config: ConfigService) => config.ldapAuthOptions,
  inject: [ConfigService],
};

const OdicAuthOptionsProvider = {
  provide: 'ODIC_AUTH_OPTIONS',
  useFactory: (config: ConfigService) => config.oidcAuthOptions,
  inject: [ConfigService],
};

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`./environments/${process.env.NODE_ENV}.env`),
    },
    LdapAuthOptionsProvider,
    OdicAuthOptionsProvider,
  ],
  exports: [ConfigService, LdapAuthOptionsProvider, OdicAuthOptionsProvider],
})
export class ConfigModule {}
