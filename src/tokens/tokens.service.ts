import { Injectable } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private readonly tokenRepository: TokenRepository,
  ) {}

  public async findAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }
}
