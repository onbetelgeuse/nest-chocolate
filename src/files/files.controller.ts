import {
  Controller,
  Get,
  Post,
  Logger,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FileDto } from './dto/file.dto';
import { User } from '../common/decorators/user.decorator';

@Controller('files')
export class FilesController {
  private readonly logger = new Logger('FileController');
  constructor(private readonly filesService: FilesService) {}

  @Post('/upload')
  @UseGuards(AuthGuard())
  @UseInterceptors(FilesInterceptor('file', 200))
  public async uploadFile(
    @UploadedFiles() files: FileDto[],
    @User('id') userId: number,
  ) {
    return this.filesService.saveAllByUserId(userId, files);
  }

  @Get()
  @UseGuards(AuthGuard())
  public async findAll(@User('id') id: number): Promise<FileDto[]> {
    const results = await this.filesService.findAllByUserId(id);
    return results.map(FileDto.fromEntity);
  }
}
