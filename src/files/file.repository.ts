import { File } from './file.entity';
import {
  Repository,
  FindManyOptions,
  EntityRepository,
  FindOneOptions,
  FindConditions,
  DeleteResult,
} from 'typeorm';
import { User } from 'src/user/user.entity';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
  public deleteOneByUserId(
    userId: number,
    filename: string,
  ): Promise<DeleteResult> {
    return this.delete({ filename, user: { id: userId } });
  }
  public async findAllByUserId(userId: number): Promise<File[]> {
    const query: FindManyOptions<File> = {
      where: { user: { id: userId } },
    };
    return this.find(query);
  }

  public async findOneByUserId(
    userId: number,
    filename: string,
  ): Promise<File> {
    const query: FindOneOptions<File> = {
      relations: ['user'],
      where: { filename, user: { id: userId } },
    };
    return this.findOneOrFail(query);
  }
}