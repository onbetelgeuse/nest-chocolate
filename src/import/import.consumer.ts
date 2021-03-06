import {
  Processor,
  Process,
  OnQueueEvent,
  BullQueueGlobalEvents,
  OnQueueFailed,
  BullQueueEvents,
} from '@nestjs/bull';
import { Logger, Injectable } from '@nestjs/common';
import { Job, DoneCallback } from 'bull';
import { IMPORT_CSV_QUEUE } from './import.constants';
import { CommuneService } from '../communes/commune.service';
import { CommuneDto } from '../communes/dto/commune.dto';

@Processor(IMPORT_CSV_QUEUE)
export class ImportConsumer {
  private readonly logger = new Logger(ImportConsumer.name);

  constructor(private readonly communeService: CommuneService) {}

  @Process({ name: 'hello' })
  handleHelloJob(job: Job) {
    this.logger.log(job.data);
  }

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

  @OnQueueFailed()
  public onFailed(job: Job) {
    this.logger.error(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );
  }

  @OnQueueEvent(BullQueueGlobalEvents.COMPLETED)
  public onGlobalCompleted(job: Job) {
    this.logger.log(
      `Global Completed job ${job.id} of type ${job.name} with result ${
        job.returnvalue
      }`,
    );
  }

  @OnQueueEvent(BullQueueEvents.COMPLETED)
  public onCompleted(job: Job) {
    this.logger.log(
      `Completed job ${job.id} of type ${job.name} with result ${
        job.returnvalue
      }`,
    );
  }
}
