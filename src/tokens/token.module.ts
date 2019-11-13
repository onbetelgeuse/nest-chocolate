import { Module } from '@nestjs/common';
import { TokensController } from './tokens.controller';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { ScheduleModule } from 'nest-schedule';
import { TokenScheduleService } from './token-schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), ScheduleModule.register({})],
  controllers: [TokensController],
  providers: [TokenService, TokenScheduleService],
  exports: [TokenService],
})
export class TokenModule {}
