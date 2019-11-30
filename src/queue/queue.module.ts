import { Module, DynamicModule } from '@nestjs/common';
import { BullModule, BullModuleOptions } from 'nest-bull';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

const BullQueueModule: DynamicModule = BullModule.registerAsync([
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService): Promise<BullModuleOptions> => ({
      name: 'import_csv',
      options: {
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      },
    }),
  },
]);

@Module({ imports: [BullQueueModule], exports: [BullQueueModule] })
export class QueueModule {}
