import {
  Injectable,
  OnModuleInit,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { Schedule, InjectSchedule } from 'nest-schedule';
import { TokenSessionService } from './token-session.service';
import { ConfigService } from '../config/config.service';
import { jobKey } from './token-session.constants';

@Injectable()
export class TokenSessionScheduleService
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(
    TokenSessionScheduleService.name,
  );
  private isCompleted: boolean = false;
  constructor(
    @InjectSchedule() private readonly schedule: Schedule,
    private readonly tokenSessionService: TokenSessionService,
    private readonly config: ConfigService,
  ) {}

  public async onModuleInit() {
    this.schedule.scheduleCronJob(
      jobKey,
      this.config.cleanupTokenSessionCronJob,
      async () => {
        try {
          const deletedRows: number = await this.tokenSessionService.cleanup();
          this.logger.debug(
            'CleanUp job : ' + deletedRows + ' row(s) deleted.',
          );
          return false;
        } catch (error) {
          this.logger.error('CleanUp job failed.', error.message);
          throw error;
        }
      },
      { maxRetry: this.config.cleanupTokenSessionMaxRetry },
    );
  }

  public onModuleDestroy(): void {
    this.schedule.cancelJob(jobKey);
  }
}
