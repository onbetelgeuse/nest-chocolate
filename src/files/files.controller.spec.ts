import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { mock, instance } from 'ts-mockito';

describe('File Controller', () => {
  let controller: FilesController;
  let fileService: FilesService;

  beforeEach(async () => {
    fileService = mock(FilesService);

    controller = new FilesController(instance(fileService));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
