import { Injectable, Logger } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as path from 'path';
import * as fs from 'fs';
import { InjectQueue } from 'nest-bull';
import { Queue } from 'bull';
import { IMPORT_CSV_QUEUE } from './import.constants';
import Bull = require('bull');

@Injectable()
export class ImportService {
  private readonly logger: Logger = new Logger(ImportService.name);
  constructor(@InjectQueue(IMPORT_CSV_QUEUE) private readonly queue: Queue) {}
  public importCsv() {
    const filename: string = path.resolve('./', 'csv', 'laposte_hexasmal.csv');
    fs.createReadStream(filename)
      .pipe(csv({ separator: ';' }))
      .on('data', async data => await this.queue.add('postalCode', data))
      .on('end', () => this.logger.log('Finish'));
  }

  public async getJobCounts(): Promise<Bull.JobCounts> {
    return this.queue.getJobCounts();
  }
}
