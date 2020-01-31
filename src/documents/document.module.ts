import { Module } from '@nestjs/common';
import { FilesController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { originalname } from './document.utils';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([DocumentRepository]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination(req, file, callback): void {
            const dest: string = join(
              configService.get('MULTER_DEST'),
              String(req.user.id),
            );
            if (!existsSync(dest)) {
              mkdirSync(dest);
            }

            callback(null, dest);
          },
          filename(req, file, callback): void {
            callback(null, originalname(file));
          },
        }),
      }),
      inject: [ConfigService],
    }),

    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [FilesController],
  providers: [DocumentsService],
})
export class DocumentModule {}
