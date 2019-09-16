import * as jwt from 'jsonwebtoken';
import {
  Injectable,
  HttpException,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { ConfigService } from '../config/config.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from './dto/create.dto';
import { UserDto } from './../user/dto/user.dto';
import { AccessToken } from './interfaces/access-token.interface';
import { AuthUtil } from './auth.util';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public async login(user: UserDto): Promise<AccessToken> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
    const token = await this.createToken(payload);
    const expiresIn = AuthUtil.toIntervalNumber(this.configService.jwtExpire);
    return { expiresIn, token };
  }
  @SetMetadata('roles', ['admin'])
  public async register(user: CreateUserDto) {
    return this.userService.create(user);
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

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto> {
    let user: User = await this.userService.findOneByEmail(username);

    if (!user) {
      user = await this.userService.findOneByUsername(username);
      if (!user) {
        throw new HttpException('Wrong credentials', 401);
      }
    }

    const passwordCorrect = user.verifyPassword(password);
    if (passwordCorrect) {
      return UserDto.fromEntity(user);
    }
    throw new HttpException('Wrong credentials', 401);
  }

  public async validatePayload(payload: JwtPayload): Promise<User | undefined> {
    return this.userService.findOneById(payload.id);
  }

  // public async validateExternalUser(profile: any): Promise<User | undefined> {
  //   if (!profile || !profile._json) {
  //     throw new UnauthorizedException('Wrong credentials');
  //   }

  //   const profileDto = ProfileUserDto.fromJson(profile._json);
  //   let user: User = await this.userService.findOneByExternalId(profileDto.id);

  //   if (!user) {
  //     user = await this.userService.createfromExternal(profileDto);
  //   }

  //   return user;
  // }
}
