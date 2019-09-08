import {
  Injectable,
  UnauthorizedException,
  HttpException,
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
      // secretOrKey: configService.jwtSecret,
    });
  }

  public async validate(payload: any) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Wrong credentials', 401);
    }
    return user;
  }
}
