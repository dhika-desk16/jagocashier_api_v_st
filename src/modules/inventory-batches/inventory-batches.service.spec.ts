import { Test, TestingModule } from '@nestjs/testing';
import { InventoryBatchesService } from './inventory-batches.service';

describe('InventoryBatchesService', () => {
  let service: InventoryBatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryBatchesService],
    }).compile();

    service = module.get<InventoryBatchesService>(InventoryBatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
