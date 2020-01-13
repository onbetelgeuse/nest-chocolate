import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImportProcessor } from './import.processor';
import { BullModule } from 'nest-bull';
import { IMPORT_CSV_QUEUE } from './import.constants';
import { CommuneModule } from '../communes/commune.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
// import { ImportQueue } from './import.queue';

@Module({
  // imports: [
  //   BullModule.registerAsync([
  //     {
  //       imports: [ConfigModule],
  //       inject: [ConfigService],
  //       useFactory: (config: ConfigService) => ({
  //         // queue: ImportQueue,
  //         options: {
  //           redis: {
  //             host: config.get('REDIS_HOST'),
  //             port: config.get<number>('REDIS_PORT'),
  //             db: config.get<number>('REDIS_DB'),
  //           },
  //         },
  //       }),
  //     },
  //   ]),
  //   CommuneModule,
  // ],
  // providers: [ImportProcessor, ImportService],
  // controllers: [ImportController],
  // exports: [ImportService],
})
export class ImportModule {}
