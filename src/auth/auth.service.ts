import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';
import { User } from '../user/user.entity';
import { ProfileUserDto } from '../user/dto/profile-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public async login(user: any): Promise<any> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
    };
    const token = await this.createToken(payload);
    const expiresIn = this.configService.jwtExpire;

    return { expiresIn, token };
  }

  private async createToken(payload: JwtPayload): Promise<any> {
    const signOptions: jwt.SignOptions = {
      algorithm: 'RS256',
      expiresIn: this.configService.jwtExpire,
      audience: this.configService.jwtAudience,
      issuer: this.configService.jwtIssuer,
    };

    return jwt.sign(payload, this.configService.jwtPrivateKey, signOptions);
  }

  public async validateLocalUser(
    username: string,
    password: string,
  ): Promise<User> {
    let user: User = await this.userService.findOneByEmail(username);

    if (!user) {
      user = await this.userService.findOneByUsername(username);
      if (!user) {
        throw new HttpException('Wrong credentials', 401);
      }
    }

    const passwordCorrect = user.verifyPassword(password);
    if (passwordCorrect) {
      return user;
    }
    throw new HttpException('Wrong credentials', 401);
  }

  public async validateUser(payload: JwtPayload): Promise<User | undefined> {
    return this.userService.findOneById(payload.id);
  }

  public async validateExternalUser(profile: any): Promise<User | undefined> {
    if (!profile || !profile._json) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const profileDto = ProfileUserDto.fromJson(profile._json);
    let user: User = await this.userService.findOneByExternalId(profileDto.id);

    if (!user) {
      user = await this.userService.createfromExternal(profileDto);
    }

    return user;
  }
}
