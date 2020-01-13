import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service';
import Bull = require('bull');

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  public createImportJob() {
    this.importService.importCsv();
  }

  @Get('/jobCounts')
  public async getJobCounts(): Promise<Bull.JobCounts> {
    return this.importService.getJobCounts();
  }
}
