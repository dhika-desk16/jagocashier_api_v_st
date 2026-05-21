import { CreateTransactionItemDto } from './dto/create-transaction-item.dto';
import { UpdateTransactionItemDto } from './dto/update-transaction-item.dto';
export declare class TransactionItemsService {
    create(createTransactionItemDto: CreateTransactionItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTransactionItemDto: UpdateTransactionItemDto): string;
    remove(id: number): string;
}
