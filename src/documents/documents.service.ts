import { Injectable, Logger } from '@nestjs/common';
import { DocumentRepository } from './document.repository';
import { Document } from './document.entity';
import { User } from '../user/user.entity';
import { DocumentDto } from './dto/document.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class DocumentsService {
  private readonly logger: Logger = new Logger(DocumentsService.name);
  constructor(private readonly documentRepository: DocumentRepository) {}

  public async findAllByUserId(userId: number): Promise<Document[]> {
    return this.documentRepository.findAllByUserId(userId);
  }

  public async findOneByUserId(
    userId: number,
    filename: string,
  ): Promise<Document> {
    return this.documentRepository.findOneByUserId(userId, filename);
  }

  public async deleteOneByUserId(
    userId: number,
    filename: string,
  ): Promise<DeleteResult> {
    return this.documentRepository.deleteOneByUserId(userId, filename);
  }

  public async saveAllByUserId(
    userId: number,
    files: DocumentDto[],
  ): Promise<Document[]> {
    const entities: Document[] = files.map(file => {
      const entity = new Document();
      Object.assign(entity, file);
      entity.user = new User();
      entity.user.id = userId;
      return entity;
    });

    return this.documentRepository.save(entities);
  }
}
