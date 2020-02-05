import { uuid } from 'uuidv4';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export function originalname(file: any): string {
  return uuid().replace(/-/g, '') + extname(file.originalname);
}

export class Utils {
  public static filename(
    req: any,
    file: any,
    callback: (error: any, value: any) => void | Promise<void>,
  ): void {
    callback(null, originalname(file));
  }

  public static destination(
    req: any,
    file: any,
    callback: (error: any, value: any) => void | Promise<void>,
    root: string,
  ): void {
    const dest: string = join(root, String(req.user.id));
    if (!existsSync(dest)) {
      mkdirSync(dest);
    }

    callback(null, dest);
  }
}
