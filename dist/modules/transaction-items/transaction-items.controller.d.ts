import { TransactionItemsService } from './transaction-items.service';
import { CreateTransactionItemDto } from './dto/create-transaction-item.dto';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto';
export declare class TransactionItemsController {
    private readonly transactionItemsService;
    constructor(transactionItemsService: TransactionItemsService);
    create(createTransactionItemDto: CreateTransactionItemDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTransactionItemDto: UpdateTransactionItemDto): string;
    remove(id: string): string;
}
