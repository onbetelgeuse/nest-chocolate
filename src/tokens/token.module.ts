import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { TokenSubscriber } from './token.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokensController],
  providers: [TokenSubscriber, TokenService],
  exports: [TokenService],
})
export class TokenModule {}
