import { Test, TestingModule } from '@nestjs/testing';
import { DejaCloudService } from './deja-cloud.service';

describe('DejaCloudService', () => {
  let service: DejaCloudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DejaCloudService],
    }).compile();

    service = module.get<DejaCloudService>(DejaCloudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
