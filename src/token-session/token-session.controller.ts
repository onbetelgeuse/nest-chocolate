import { Controller, Get } from '@nestjs/common';
import { TokenSessionService } from './token-session.service';
import { TokenSessionDto } from './dto/token-session.dto';
import { TokenSession } from './token-session.entity';

@Controller('tokens')
export class TokenSessionController {
  constructor(private readonly tokenService: TokenSessionService) {}
  @Get()
  public async findAll(): Promise<TokenSessionDto[]> {
    const entities: TokenSession[] = await this.tokenService.findAll();
    return entities.map(TokenSessionDto.fromEntity);
  }
}
