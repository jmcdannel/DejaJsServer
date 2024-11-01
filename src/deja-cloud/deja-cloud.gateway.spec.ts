import { Test, TestingModule } from '@nestjs/testing';
import { DejaCloudGateway } from './deja-cloud.gateway';
import { DejaCloudService } from './deja-cloud.service';

describe('DejaCloudGateway', () => {
  let gateway: DejaCloudGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DejaCloudGateway, DejaCloudService],
    }).compile();

    gateway = module.get<DejaCloudGateway>(DejaCloudGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
