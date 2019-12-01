import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueEvent,
  BullQueueGlobalEvents,
  OnQueueFailed,
} from 'nest-bull';
import { Logger, Injectable } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { IMPORT_CSV_QUEUE } from './import.constants';
import { CommuneService } from '../communes/commune.service';
import { CommuneDto } from '../communes/dto/commune.dto';

@Injectable()
@Processor({ name: IMPORT_CSV_QUEUE })
export class ImportProcessor {
  private readonly logger = new Logger(ImportProcessor.name);

  constructor(private readonly communeService: CommuneService) {}

  @Process({ name: 'postalCode' })
  public async processPostalCode(
    job: Job,
    callback: DoneCallback,
  ): Promise<void> {
    try {
      this.logger.log(job.data);
      const commune: CommuneDto = CommuneDto.fromCsv(job.data);
      await this.communeService.save(commune);
      callback(null, job.id);
    } catch (error) {
      callback(error, job.id);
    }
  }

  @OnQueueActive()
  public onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueFailed()
  public onFailed(job: Job) {
    this.logger.error(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueEvent(BullQueueGlobalEvents.COMPLETED)
  public onCompleted(job: Job) {
    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with result ${
        job.returnvalue
      }`,
    );
  }
}
