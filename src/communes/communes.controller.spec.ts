import { Test, TestingModule } from '@nestjs/testing';
import { CommunesController } from './communes.controller';

describe('Communes Controller', () => {
  let controller: CommunesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunesController],
    }).compile();

    controller = module.get<CommunesController>(CommunesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
