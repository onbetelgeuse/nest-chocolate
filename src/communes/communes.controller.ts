import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommuneDto } from './dto/commune.dto';
import { CommuneService } from './commune.service';

@Controller('communes')
export class CommunesController {
  constructor(public readonly communeService: CommuneService) {}

  @Get()
  public async findAll(@Query('q') term: string): Promise<CommuneDto[]> {
    return this.communeService.search(term);
  }

  @Get(':code')
  public async findByCode(@Param('code') code: string): Promise<CommuneDto> {
    return this.communeService.findByCode(code);
  }
}
