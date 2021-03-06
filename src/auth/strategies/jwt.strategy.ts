import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from '../../user/dto/user.dto';
import { AccessToken } from '../interfaces/access-token.interface';
import { TokenSessionService } from '../../token-session/token-session.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly tokenSessionService: TokenSessionService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: JwtStrategy.cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.jwtPublicKey,
      audience: configService.jwtAudience,
      issuer: configService.jwtIssuer,
      algorithms: [configService.jwtAlgorithm],
    });
  }

  public async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validatePayload(payload);
    const token = await this.tokenSessionService.findByPayload(payload);
    if (!user || !user.active || !token || token.revoked) {
      done(new HttpException('Wrong credentials', 401), false);
    }
    done(null, UserDto.fromEntity(user), payload.iat);
  }

  private static cookieExtractor(req: any) {
    let token: string;
    if (req && req.cookies) {
      token = req.cookies.chlt;
    }
    return token;
  }
}
