import { Test, TestingModule } from '@nestjs/testing';
import { EffectsService } from './effects.service';

describe('EffectsService', () => {
  let service: EffectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EffectsService],
    }).compile();

    service = module.get<EffectsService>(EffectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
