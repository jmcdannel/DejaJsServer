import { Test, TestingModule } from '@nestjs/testing';
import { LocosGateway } from './locos.gateway';
import { LocosService } from './locos.service';

describe('LocosGateway', () => {
  let gateway: LocosGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocosGateway, LocosService],
    }).compile();

    gateway = module.get<LocosGateway>(LocosGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
