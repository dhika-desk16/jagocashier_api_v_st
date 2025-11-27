import { Module } from '@nestjs/common';
import { TransactionItemsService } from './transaction-items.service';
import { TransactionItemsController } from './transaction-items.controller';

@Module({
  controllers: [TransactionItemsController],
  providers: [TransactionItemsService],
})
export class TransactionItemsModule {}
