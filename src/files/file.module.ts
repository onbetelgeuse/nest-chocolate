import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRepository]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('MULTER_DEST'),
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
  providers: [FilesService],
})
export class FileModule {}
