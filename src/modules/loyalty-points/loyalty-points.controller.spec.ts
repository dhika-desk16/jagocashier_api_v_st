import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyPointsController } from './loyalty-points.controller';
import { LoyaltyPointsService } from './loyalty-points.service';

describe('LoyaltyPointsController', () => {
  let controller: LoyaltyPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyPointsController],
      providers: [LoyaltyPointsService],
    }).compile();

    controller = module.get<LoyaltyPointsController>(LoyaltyPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
