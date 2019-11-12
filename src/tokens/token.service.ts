import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: TokenRepository,
  ) {}

  public async findAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  public async add(token: TokenDto): Promise<Token> {
    const entity: Token = TokenDto.toEntity(token);
    return this.tokenRepository.save(entity);
  }
}
