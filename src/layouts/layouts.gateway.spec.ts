import { Test, TestingModule } from '@nestjs/testing';
import { LayoutsGateway } from './layouts.gateway';
import { LayoutsService } from './layouts.service';

describe('LayoutsGateway', () => {
  let gateway: LayoutsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LayoutsGateway, LayoutsService],
    }).compile();

    gateway = module.get<LayoutsGateway>(LayoutsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
