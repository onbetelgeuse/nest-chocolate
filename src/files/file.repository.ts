import { File } from './file.entity';
import { Repository, FindManyOptions, EntityRepository } from 'typeorm';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  public async findAllByUserId(userId: number): Promise<File[]> {
    const query: FindManyOptions<File> = {
      where: { user: { id: userId } },
    };
    return this.find(query);
  }
}
