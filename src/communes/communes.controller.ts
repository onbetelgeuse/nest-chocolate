import { Controller, Get, Param } from '@nestjs/common';
import { CommuneDto } from './dto/commune.dto';
import { CommuneService } from './commune.service';

@Controller('communes')
export class CommunesController {
  constructor(public readonly communeService: CommuneService) {}

  @Get()
  public async findAll(): Promise<CommuneDto[]> {
    return this.communeService.findAll();
  }

  @Get(':code')
  public async findByCode(@Param('code') code: string): Promise<CommuneDto> {
    return this.communeService.findByCode(code);
  }
}
