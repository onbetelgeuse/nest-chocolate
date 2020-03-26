import { Controller, Get } from '@nestjs/common';
import { ImportService } from './import.service';

@Controller('import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  public async createImportJob() {
    return this.importService.importCsv();
  }
}
