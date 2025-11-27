import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyTransactionsController } from './loyalty-transactions.controller';
import { LoyaltyTransactionsService } from './loyalty-transactions.service';

describe('LoyaltyTransactionsController', () => {
  let controller: LoyaltyTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyTransactionsController],
      providers: [LoyaltyTransactionsService],
    }).compile();

    controller = module.get<LoyaltyTransactionsController>(LoyaltyTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
