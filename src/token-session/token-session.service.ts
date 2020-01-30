import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { TokenSessionRepository } from './token-session.repository';
import { TokenSession } from './token-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenSessionDto } from './dto/token-session.dto';
import * as moment from 'moment';
import { LessThan, FindConditions, DeleteResult, MoreThan } from 'typeorm';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class TokenSessionService {
  private readonly logger: Logger = new Logger(TokenSessionService.name);

  constructor(
    @InjectRepository(TokenSession)
    private readonly tokenRepository: TokenSessionRepository,
    private readonly config: ConfigService,
  ) {}

  public async findAll(): Promise<TokenSession[]> {
    return this.tokenRepository.find();
  }

  public async add(token: TokenSessionDto): Promise<TokenSession> {
    const entity: TokenSession = TokenSessionDto.toEntity(token);
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
