import { Module, forwardRef } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImportProcessor } from './import.processor';
import { BullModule } from 'nest-bull';
import { IMPORT_CSV_QUEUE } from './import.constants';
import { CommuneModule } from '../communes/commune.module';

@Module({
  imports: [
    // forwardRef(() => QueueModule),
    BullModule.register({
      name: IMPORT_CSV_QUEUE,
      options: {
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT) || 6379,
          db: Number(process.env.REDIS_DB) || 0,
        },
      },
    }),
    CommuneModule,
  ],
  providers: [ImportService, ImportProcessor],
  controllers: [ImportController],
  exports: [ImportService],
})
export class ImportModule {}
