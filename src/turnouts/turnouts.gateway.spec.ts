import { Test, TestingModule } from '@nestjs/testing';
import { TurnoutsGateway } from './turnouts.gateway';
import { TurnoutsService } from './turnouts.service';

describe('TurnoutsGateway', () => {
  let gateway: TurnoutsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnoutsGateway, TurnoutsService],
    }).compile();

    gateway = module.get<TurnoutsGateway>(TurnoutsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
