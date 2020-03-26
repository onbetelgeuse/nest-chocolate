import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportConsumer } from './import.consumer';
import { CommuneModule } from '../communes/commune.module';
import {
  BullModule,
  BullModuleOptions,
  BullModuleAsyncOptions,
} from '@nestjs/bull';
import { IMPORT_CSV_QUEUE } from './import.constants';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ImportService } from './import.service';

function redisOptions(config: ConfigService) {
  return {
    host: config.get('REDIS_HOST'),
    port: config.get<number>('REDIS_PORT'),
    db: config.get<number>('REDIS_DB'),
    name: IMPORT_CSV_QUEUE,
  };
}

@Module({
  imports: [
    CommuneModule,
    BullModule.registerQueueAsync({
      name: IMPORT_CSV_QUEUE,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<BullModuleOptions> => ({
        name: IMPORT_CSV_QUEUE,
        redis: redisOptions(config),
      }),
    } as BullModuleAsyncOptions),
  ],
  providers: [ImportConsumer, ImportService],
  controllers: [ImportController],
  exports: [],
})
export class ImportModule {}
