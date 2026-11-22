import { Module } from '@nestjs/common';
import { InventoryBatchesService } from './inventory-batches.service';
import { InventoryBatchesController } from './inventory-batches.controller';

@Module({
  controllers: [InventoryBatchesController],
  providers: [InventoryBatchesService],
  exports: [InventoryBatchesService],
})
export class InventoryBatchesModule {}
