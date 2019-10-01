import { Injectable, Logger } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { File } from './file.entity';
import { User } from '../user/user.entity';
import { FileDto } from './dto/file.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class FilesService {
  private readonly logger: Logger = new Logger('FilesService');
  constructor(private readonly fileRepository: FileRepository) {}

  public async findAllByUserId(userId: number): Promise<File[]> {
    return this.fileRepository.findAllByUserId(userId);
  }

  public async findOneByUserId(
    userId: number,
    filename: string,
  ): Promise<File> {
    return this.fileRepository.findOneByUserId(userId, filename);
  }

  public async deleteOneByUserId(
    userId: number,
    filename: string,
  ): Promise<DeleteResult> {
    return this.fileRepository.deleteOneByUserId(userId, filename);
  }

  public async saveAllByUserId(
    userId: number,
    files: FileDto[],
  ): Promise<File[]> {
    const entities: File[] = files.map(file => {
      const entity = new File();
      Object.assign(entity, file);
      entity.user = new User();
      entity.user.id = userId;
      return entity;
    });

    return this.fileRepository.save(entities);
  }
}
