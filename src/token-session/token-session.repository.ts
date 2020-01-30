import { TokenSession } from './token-session.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenSessionRepository extends Repository<TokenSession> {}
