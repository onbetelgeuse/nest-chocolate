import { Controller, Get } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokenDto } from './dto/token.dto';
import { Token } from './token.entity';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokenService: TokensService) {}
  @Get()
  public async findAll(): Promise<TokenDto[]> {
    const entities: Token[] = await this.tokenService.findAll();
    return entities.map(TokenDto.fromEntity);
  }
}
