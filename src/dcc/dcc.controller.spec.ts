import { Test, TestingModule } from '@nestjs/testing';
import { DccController } from './dcc.controller';
import { DccService } from './dcc.service';

describe('DccController', () => {
  let controller: DccController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DccController],
      providers: [DccService],
    }).compile();

    controller = module.get<DccController>(DccController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
