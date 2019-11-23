import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { mock, instance } from 'ts-mockito';
import { ConfigService } from '../config/config.service';

describe('File Controller', () => {
  let controller: FilesController;
  let fileService: FilesService;
  let configService: ConfigService;

  beforeEach(async () => {
    fileService = mock(FilesService);
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
