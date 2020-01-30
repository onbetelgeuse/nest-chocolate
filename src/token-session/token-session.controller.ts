import { Controller, Get } from '@nestjs/common';
import { TokenSessionService } from './token-session.service';
import { TokenSessionDto } from './dto/token-session.dto';

@Controller('tokens')
export class TokenSessionController {
  constructor(private readonly tokenService: TokenSessionService) {}
  @Get()
  public async findAll(): Promise<TokenSessionDto[]> {
    return this.tokenService.findAll();
  }
}
