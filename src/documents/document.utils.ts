import { uuid } from 'uuidv4';
import { extname } from 'path';

export function originalname(file: any): string {
  return uuid().replace(/-/g, '') + extname(file.originalname);
}
