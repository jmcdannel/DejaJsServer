import { Test, TestingModule } from '@nestjs/testing';
import { DccService } from './dcc.service';

describe('DccService', () => {
  let service: DccService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DccService],
    }).compile();

    service = module.get<DccService>(DccService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
