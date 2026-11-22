import { Test, TestingModule } from '@nestjs/testing';
import { InventoryBatchesController } from './inventory-batches.controller';
import { InventoryBatchesService } from './inventory-batches.service';

describe('InventoryBatchesController', () => {
  let controller: InventoryBatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryBatchesController],
      providers: [InventoryBatchesService],
    }).compile();

    controller = module.get<InventoryBatchesController>(InventoryBatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
