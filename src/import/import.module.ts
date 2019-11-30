import { Module, forwardRef } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImportProcessor } from './import.processor';

import { QueueModule } from '../queue/queue.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, forwardRef(() => QueueModule)],
  providers: [ImportService, ImportProcessor],
  controllers: [ImportController],
  exports: [ImportService],
})
export class ImportModule {}
