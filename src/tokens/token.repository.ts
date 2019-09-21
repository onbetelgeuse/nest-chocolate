import { Token } from './token.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository extends Repository<Token> {}
