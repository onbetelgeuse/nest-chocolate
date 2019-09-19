import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LdapStrategy } from './strategies/ldap.strategy';
import { ConfigModule } from '../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { OpenIdConnectStrategy } from './strategies/openidconnect.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        // secret: config.jwtSecret,
        secretOrPrivateKey: config.jwtPrivateKey,
        signOptions: {
          expiresIn: config.jwtExpire,
          audience: config.jwtAudience,
          issuer: config.jwtIssuer,
          algorithm: config.jwtAlgorithm,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LdapStrategy,
    JwtStrategy,
    OpenIdConnectStrategy,
    LocalStrategy,
    Logger,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy],
})
export class AuthModule {}
