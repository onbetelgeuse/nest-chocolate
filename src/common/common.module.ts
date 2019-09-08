import { Module, Logger } from '@nestjs/common';

@Module({
  providers: [Logger],
})
export class CommonModule {}
