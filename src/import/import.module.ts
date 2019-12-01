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
    BullModule.register({ name: IMPORT_CSV_QUEUE }),
    CommuneModule,
  ],
  providers: [ImportService, ImportProcessor],
  controllers: [ImportController],
  exports: [ImportService],
})
export class ImportModule {}
