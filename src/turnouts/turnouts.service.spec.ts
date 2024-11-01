import { Test, TestingModule } from '@nestjs/testing';
import { TurnoutsService } from './turnouts.service';

describe('TurnoutsService', () => {
  let service: TurnoutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoutsService],
    }).compile();

    service = module.get<TurnoutsService>(TurnoutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
