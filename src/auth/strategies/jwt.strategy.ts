import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { ConfigService } from '../../config/config.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from '../../user/dto/user.dto';

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
      algorithms: [configService.jwtAlgorithm],
    });
  }

  public async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validatePayload(payload);
    if (!user || !user.active) {
      done(new HttpException('Wrong credentials', 401), false);
    }
    done(null, UserDto.fromEntity(user), payload.iat);
  }
}
