import { Commune } from '../commune.entity';

export class CommuneDto {
  constructor(
    public code: string,
    public name: string,
    public postalCode: string,
  ) {}

  public static fromCsv(csv: any): CommuneDto {
    return new CommuneDto(
      csv.Code_commune_INSEE,
      csv.Nom_commune,
      csv.Code_postal,
    );
  }

  public static fromEntity(entity: Commune): CommuneDto {
    return new CommuneDto(entity.code, entity.name, entity.postalCode);
  }

  public static toEntity(commune: CommuneDto): Commune {
    const entity: Commune = new Commune();
    entity.code = commune.code;
    entity.name = commune.name;
    entity.postalCode = commune.postalCode;

    return entity;
  }
}
