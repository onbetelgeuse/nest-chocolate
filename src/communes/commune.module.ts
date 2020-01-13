import { Module } from '@nestjs/common';
import { CommunesController } from './communes.controller';
import { CommuneService } from './commune.service';
import { CommuneRepository } from './commune.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommuneRepository])],
  controllers: [CommunesController],
  providers: [CommuneService],
  exports: [CommuneService],
})
export class CommuneModule {}
