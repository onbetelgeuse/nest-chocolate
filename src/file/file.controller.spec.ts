import { FileController } from './file.controller';
import { FileService } from './file.service';
import { mock, instance } from 'ts-mockito';

describe('File Controller', () => {
  let controller: FileController;
  let fileService: FileService;

  beforeEach(async () => {
    fileService = mock(FileService);

    controller = new FileController(instance(fileService));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
