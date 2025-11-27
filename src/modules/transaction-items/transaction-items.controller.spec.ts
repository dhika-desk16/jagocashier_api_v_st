import { Test, TestingModule } from '@nestjs/testing';
import { TransactionItemsController } from './transaction-items.controller';
import { TransactionItemsService } from './transaction-items.service';

describe('TransactionItemsController', () => {
  let controller: TransactionItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionItemsController],
      providers: [TransactionItemsService],
    }).compile();

    controller = module.get<TransactionItemsController>(TransactionItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
