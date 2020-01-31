import { Document } from '../document.entity';

export class DocumentDto {
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

  public static fromEntity(doc: Document): DocumentDto {
    return new DocumentDto(
      doc.filename,
      doc.originalname,
      doc.encoding,
      doc.mimetype,
      doc.destination,
      doc.fieldname,
      doc.path,
      doc.size,
    );
  }
}
