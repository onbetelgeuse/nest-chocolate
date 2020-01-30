import { Module } from '@nestjs/common';
import { TokenSessionController } from './token-session.controller';
import { TokenSessionService } from './token-session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenSession } from './token-session.entity';
import { ScheduleModule } from 'nest-schedule';
import { TokenSessionScheduleService } from './token-session-schedule.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenSession]),
    ScheduleModule.register({}),
    ConfigModule,
  ],
  controllers: [TokenSessionController],
  providers: [TokenSessionService, TokenSessionScheduleService],
  exports: [TokenSessionService],
})
export class TokenSessionModule {}
