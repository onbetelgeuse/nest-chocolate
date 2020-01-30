import { Injectable, Logger } from '@nestjs/common';
import { TokenSessionRepository } from './token-session.repository';
import { TokenSession } from './token-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenSessionDto } from './dto/token-session.dto';
import * as moment from 'moment';
import { LessThan, DeleteResult } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import { Utils } from '../common/common.util';

@Injectable()
export class TokenSessionService {
  private readonly logger: Logger = new Logger(TokenSessionService.name);

  constructor(
    @InjectRepository(TokenSession)
    private readonly tokenRepository: TokenSessionRepository,
    private readonly config: ConfigService,
  ) {}

  public async findAll(): Promise<TokenSessionDto[]> {
    const entities: TokenSession[] = await this.tokenRepository.find();
    return entities.map(TokenSessionDto.fromEntity);
  }

  public async add(token: TokenSessionDto): Promise<TokenSessionDto> {
    const entity: TokenSession = TokenSessionDto.toEntity(token);
    const result: TokenSession = await this.tokenRepository.save(entity);
    return TokenSessionDto.fromEntity(result);
  }

  public async cleanup(): Promise<number> {
    const result: DeleteResult = await this.tokenRepository.delete({
      createdAt: LessThan(
        moment()
          .subtract(Utils.toSeconds(this.config.jwtExpire), 'seconds')
          .utc(),
      ),
    });
    return result.affected;
  }
}
