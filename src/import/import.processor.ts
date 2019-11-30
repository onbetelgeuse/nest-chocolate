import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueEvent,
  BullQueueGlobalEvents,
} from 'nest-bull';
import { Logger, Injectable } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';

@Injectable()
@Processor({ name: 'import_csv' })
export class ImportProcessor {
  private readonly logger = new Logger(ImportProcessor.name);

  @Process({ name: 'postalCode' })
  public processPostalCode(job: Job, callback: DoneCallback) {
    this.logger.log(job.data);
    callback(null, job.id);
  }

  @OnQueueActive()
  public onActive(job: Job) {
    this.logger.log(
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