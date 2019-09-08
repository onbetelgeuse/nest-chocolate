import {
  Controller,
  Post,
  UseGuards,
  Body,
  Logger,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  getProfile(@Request() req) {
    this.logger.log('user', req.user);
    return req.user;
  }

  @UseGuards(AuthGuard('ldapauth'))
  @Post('ldap/login')
  public async ldapLogin(): Promise<any> {
    this.logger.log('/ldap/login');
    return '';
  }

  @UseGuards(AuthGuard('openidconnect'))
  @Get('external/login')
  public async externalLogin(): Promise<void> {}

  @UseGuards(AuthGuard('openidconnect'))
  @Get('external/callback')
  public async externalCallback(@Request() req): Promise<void> {
    this.logger.log(req.user);
  }
}
