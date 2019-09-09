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
import { Roles } from '../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create.dto';
import { AccessToken } from './interfaces/access-token.interface';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  @Post('register')
  public async register(
    @Request() req,
    @Body() user: CreateUserDto,
  ): Promise<any> {
    return this.authService.register(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin12')
  getProfile(@Request() req) {
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
