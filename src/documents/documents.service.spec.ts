import { DocumentsService } from './documents.service';
import { DocumentRepository } from './document.repository';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { Document } from './document.entity';
import { DocumentDto } from './dto/document.dto';

describe('FileService', () => {
  let service: DocumentsService;
  let repository: DocumentRepository;

  beforeEach(() => {
    repository = mock(DocumentRepository);
    service = new DocumentsService(instance(repository));
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
      const results: Document[] = await service.findAllByUserId(userId);
      // verify
      verify(repository.findAllByUserId(userId)).once();
      expect(results).toStrictEqual(files);
    });

    it('3) saveAllByUserId should be called', async () => {
      // prepare
      const userId: number = 28;
      when(repository.save(anything())).thenResolve(files);
      // execute
      const results: Document[] = await service.saveAllByUserId(
        userId,
        files.map(DocumentDto.fromEntity),
      );
      // verify
      verify(repository.save(anything())).once();
      expect(results).toStrictEqual(files);
    });
  });
});

const files: Document[] = [1, 2, 3].map(x => {
  const file: Document = new Document();
  file.filename = `xxxx-xxxx-xxx${x}`;
  file.fieldname = 'file';
  file.mimetype = 'image/jpeg';
  file.path = `path ${x}`;
  file.destination = `dest ${x}`;
  file.encoding = '7bit';
  file.originalname = `${x}.jpeg`;

  return file;
});
