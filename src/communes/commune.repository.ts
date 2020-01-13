import { Commune } from './commune.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Commune)
export class CommuneRepository extends Repository<Commune> {}
