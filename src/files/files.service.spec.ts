import { FilesService } from './files.service';
import { FileRepository } from './file.repository';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { File } from './file.entity';
import { FileDto } from './dto/file.dto';

describe('FileService', () => {
  let service: FilesService;
  let repository: FileRepository;

  beforeEach(() => {
    repository = mock(FileRepository);
    service = new FilesService(instance(repository));
  });

  describe('A) Nominal case', () => {
    it('1) should be defined', () => {
      // verify
      expect(service).toBeDefined();
    });

    it('2) findAllByUserId should be called', async () => {
      // prepare
      const userId: number = 28;
      when(repository.findAllByUserId(userId)).thenResolve(files);
      // execute
      const results: File[] = await service.findAllByUserId(userId);
      // verify
      verify(repository.findAllByUserId(userId)).once();
      expect(results).toStrictEqual(files);
    });

    it('3) saveAllByUserId should be called', async () => {
      // prepare
      const userId: number = 28;
      when(repository.save(anything())).thenResolve(files);
      // execute
      const results: File[] = await service.saveAllByUserId(
        userId,
        files.map(FileDto.fromEntity),
      );
      // verify
      verify(repository.save(anything())).once();
      expect(results).toStrictEqual(files);
    });
  });
});

const files: File[] = [1, 2, 3].map(x => {
  const file: File = new File();
  file.filename = `xxxx-xxxx-xxx${x}`;
  file.fieldname = 'file';
  file.mimetype = 'image/jpeg';
  file.path = `path ${x}`;
  file.destination = `dest ${x}`;
  file.encoding = '7bit';
  file.originalname = `${x}.jpeg`;

  return file;
});
