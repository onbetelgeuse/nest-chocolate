import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  public async findAll(): Promise<string[]> {
    return new Promise(
      (resolve: (value: string[]) => void, reject: (err?: any) => void) => {
        fs.readdir('.', { withFileTypes: true }, (err, files) => {
          if (!err) {
            const directories: string[] = files
              .filter(file => file.isDirectory())
              .map(file => file.name);
            if (!this.isRoot()) {
              directories.unshift('..');
            }
            resolve(directories);
          }
          reject(err);
        });
      },
    );
  }

  private isRoot(): boolean {
    console.log(path.parse(process.cwd()));
    return path.parse(process.cwd()).root === process.cwd();
  }
}
