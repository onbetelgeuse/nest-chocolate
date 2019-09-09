import {
  Injectable,
  UnauthorizedException,
  HttpException,
  Logger,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtPublicKey,
      audience: configService.jwtAudience,
      issuer: configService.jwtIssuer,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    Logger.log(payload);
    const user = await this.authService.validatePayload(payload);
    if (!user) {
      throw new HttpException('Wrong credentials', 401);
    }
    return user;
  }
}
