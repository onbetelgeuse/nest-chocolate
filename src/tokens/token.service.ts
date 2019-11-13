import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { TokenRepository } from './token.repository';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from './dto/token.dto';
import * as moment from 'moment';
import { LessThan, FindConditions, DeleteResult, MoreThan } from 'typeorm';

@Injectable()
export class TokenService {
  private readonly logger: Logger = new Logger(TokenService.name);

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

  public async cleanup(): Promise<DeleteResult> {
    return this.tokenRepository.delete({
      createdAt: LessThan(
        moment()
          .subtract(2, 'minutes')
          .utc(),
      ),
    });
  }
}
