import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { InventoryBatchesModule } from '../inventory-batches/inventory-batches.module';

@Module({
  imports: [InventoryBatchesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
