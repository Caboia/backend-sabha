import { Test, TestingModule } from '@nestjs/testing';
import { ReservarSalaService } from './reservar-sala.service';

describe('ReservarSalaService', () => {
  let service: ReservarSalaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservarSalaService],
    }).compile();

    service = module.get<ReservarSalaService>(ReservarSalaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
