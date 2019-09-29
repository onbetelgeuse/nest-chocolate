import { Injectable, Logger } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { File } from './file.entity';
import { User } from '../user/user.entity';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FilesService {
  private readonly logger: Logger = new Logger('FilesService');
  constructor(private readonly fileRepository: FileRepository) {}

  public async findAllByUserId(userId: number): Promise<File[]> {
    return this.fileRepository.findAllByUserId(userId);
  }

  public async saveAllByUserId(
    userId: number,
    files: FileDto[],
  ): Promise<File[]> {
    const entities: File[] = files.map(file => {
      const entity = new File();
      entity.filename = file.filename;
      entity.destination = file.destination;
      entity.encoding = file.encoding;
      entity.fieldname = file.fieldname;
      entity.mimetype = file.mimetype;
      entity.originalname = file.originalname;
      entity.path = file.path;
      entity.size = file.size;
      entity.user = new User();
      entity.user.id = userId;
      return entity;
    });

    return this.fileRepository.save(entities);
  }
}
