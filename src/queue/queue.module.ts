import { Module, DynamicModule } from '@nestjs/common';
import { BullModule, BullModuleOptions } from 'nest-bull';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { IMPORT_CSV_QUEUE } from '../import/import.constants';

function redisOptions(config: ConfigService) {
  return {
    host: config.get('REDIS_HOST'),
    port: config.get<number>('REDIS_PORT'),
    db: config.get<number>('REDIS_DB'),
  };
}

const BullQueueModule: DynamicModule = BullModule.registerAsync([
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService): Promise<BullModuleOptions> => ({
      name: IMPORT_CSV_QUEUE,
      options: {
        redis: redisOptions(config),
      },
    }),
  },
]);

@Module({ imports: [BullQueueModule], exports: [BullQueueModule] })
export class QueueModule {}
