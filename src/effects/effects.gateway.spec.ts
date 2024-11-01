import { Test, TestingModule } from '@nestjs/testing';
import { EffectsGateway } from './effects.gateway';
import { EffectsService } from './effects.service';

describe('EffectsGateway', () => {
  let gateway: EffectsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EffectsGateway, EffectsService],
    }).compile();

    gateway = module.get<EffectsGateway>(EffectsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
