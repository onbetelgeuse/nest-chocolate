import { FilesController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { mock, instance } from 'ts-mockito';
import { ConfigService } from '../config/config.service';

describe('File Controller', () => {
  let controller: FilesController;
  let fileService: DocumentsService;
  let configService: ConfigService;

  beforeEach(async () => {
    fileService = mock(DocumentsService);
    configService = mock(ConfigService);

    controller = new FilesController(
      instance(fileService),
      instance(configService),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
