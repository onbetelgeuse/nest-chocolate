import { File } from '../file.entity';

export class FileDto {
  constructor(
    public readonly filename: string,
    public readonly originalname: string,
    public readonly encoding: string,
    public readonly mimetype: string,
    public readonly destination: string,
    public readonly fieldname: string,
    public readonly path: string,
    public readonly size: number,
  ) {}

  public static fromEntity(file: File): FileDto {
    return new FileDto(
      file.filename,
      file.originalname,
      file.encoding,
      file.mimetype,
      file.destination,
      file.fieldname,
      file.path,
      file.size,
    );
  }
}
