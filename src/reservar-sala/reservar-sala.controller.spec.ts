import { Test, TestingModule } from '@nestjs/testing';
import { ReservarSalaController } from './reservar-sala.controller';

describe('ReservarSalaController', () => {
  let controller: ReservarSalaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservarSalaController],
    }).compile();

    controller = module.get<ReservarSalaController>(ReservarSalaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
