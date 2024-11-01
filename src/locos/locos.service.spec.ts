import { Test, TestingModule } from '@nestjs/testing';
import { LocosService } from './locos.service';

describe('LocosService', () => {
  let service: LocosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocosService],
    }).compile();

    service = module.get<LocosService>(LocosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
