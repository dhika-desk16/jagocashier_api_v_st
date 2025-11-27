import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyPointsService } from './loyalty-points.service';

describe('LoyaltyPointsService', () => {
  let service: LoyaltyPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltyPointsService],
    }).compile();

    service = module.get<LoyaltyPointsService>(LoyaltyPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
