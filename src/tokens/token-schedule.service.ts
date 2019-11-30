import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Schedule, InjectSchedule } from 'nest-schedule';
import { TokenService } from './token.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TokenScheduleService implements OnModuleInit {
  private readonly logger: Logger = new Logger(TokenScheduleService.name);
  private isCompleted: boolean = false;
  constructor(
    @InjectSchedule() private readonly schedule: Schedule,
    private readonly tokenService: TokenService,
  ) {}

  public async onModuleInit() {
    this.schedule.scheduleCronJob(
      'cleanup_token',
      '0 0 */4 * * 1-5',
      async (): Promise<boolean> => {
        const deleteResult: DeleteResult = await this.tokenService.cleanup();
        this.logger.log(deleteResult.affected + ' row(s) deleted');
        return this.isCompleted;
      },
    );
  }
}
