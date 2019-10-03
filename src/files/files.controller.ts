import {
  Controller,
  Get,
  Post,
  Logger,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FileDto } from './dto/file.dto';
import { User } from '../common/decorators/user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import * as fs from 'fs';
import { ConfigService } from '../config/config.service';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger('FileController');
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('file', 20))
  public async uploadFiles(
    @UploadedFiles() files: FileDto[],
    @User('id') userId: number,
  ) {
    return this.filesService.saveAllByUserId(userId, files);
  }

  @Get('/download/:filename')
  @UseGuards(AuthGuard())
  public async downloadFile(
    @User('id') id: number,
    @Param('filename') filename: string,
    @Res() res,
  ) {
    const file = await this.filesService.findOneByUserId(id, filename);
    return res.sendFile(file.filename, {
      root: this.configService.get('MULTER_DEST'),
    });
  }

  @Get()
  @UseGuards(AuthGuard())
  public async findAll(@User('id') id: number): Promise<FileDto[]> {
    const results = await this.filesService.findAllByUserId(id);
    return results.map(FileDto.fromEntity);
  }

  @Get(':filename')
  @UseGuards(AuthGuard())
  public async findOne(
    @User('id') id: number,
    @Param('filename') filename: string,
  ): Promise<FileDto> {
    try {
      const result = await this.filesService.findOneByUserId(id, filename);
      return FileDto.fromEntity(result);
    } catch (error) {
      this.logger.log(error.message);
      throw new HttpException('File is not found.', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':filename')
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  public async delete(
    @User('id') id: number,
    @Param('filename') filename: string,
  ): Promise<boolean> {
    try {
      const file = await this.filesService.findOneByUserId(id, filename);
      fs.unlinkSync(file.path);
      const result = await this.filesService.deleteOneByUserId(id, filename);
      return result.affected > 0;
    } catch (error) {
      this.logger.log(error.message);
      throw new HttpException('File is not found.', HttpStatus.NOT_FOUND);
    }
  }
}
