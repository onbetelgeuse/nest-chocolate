import { Document } from './document.entity';
import {
  Repository,
  FindManyOptions,
  EntityRepository,
  FindOneOptions,
  DeleteResult,
} from 'typeorm';

@EntityRepository(Document)
export class DocumentRepository extends Repository<Document> {
  public deleteOneByUserId(
    userId: number,
    filename: string,
  ): Promise<DeleteResult> {
    return this.delete({ filename, user: { id: userId } });
  }
  public async findAllByUserId(userId: number): Promise<Document[]> {
    const query: FindManyOptions<Document> = {
      where: { user: { id: userId } },
    };
    return this.find(query);
  }

  public async findOneByUserId(
    userId: number,
    filename: string,
  ): Promise<Document> {
    const query: FindOneOptions<Document> = {
      relations: ['user'],
      where: { filename, user: { id: userId } },
    };
    return this.findOneOrFail(query);
  }
}
