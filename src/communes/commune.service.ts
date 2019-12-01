import { Injectable, BadRequestException } from '@nestjs/common';
import { CommuneRepository } from './commune.repository';
import { CommuneDto } from './dto/commune.dto';
import { Commune } from './commune.entity';

@Injectable()
export class CommuneService {
  constructor(private readonly communeRepository: CommuneRepository) {}

  public async findByCode(code: string): Promise<CommuneDto | undefined> {
    const entity: Commune = await this.communeRepository.findOne({
      where: { code },
    });
    if (entity) {
      return CommuneDto.fromEntity(entity);
    }
  }

  public async findAllByPostalCode(postalCode: string): Promise<CommuneDto[]> {
    const entities: Commune[] = await this.communeRepository.find({
      where: { postalCode },
    });
    return entities.map(CommuneDto.fromEntity);
  }

  public async findAll(): Promise<CommuneDto[]> {
    const entities: Commune[] = await this.communeRepository.find();
    return entities.map(CommuneDto.fromEntity);
  }

  public async save(commune: CommuneDto): Promise<void> {
    if (commune) {
      const entity: Commune = CommuneDto.toEntity(commune);
      await this.communeRepository.save(entity);
    } else {
      throw new BadRequestException('Parameter "commune" cannot be undefined.');
    }
  }
}
