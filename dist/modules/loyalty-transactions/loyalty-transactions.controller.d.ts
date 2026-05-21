import { LoyaltyTransactionsService } from './loyalty-transactions.service';
import { CreateLoyaltyTransactionDto } from './dto/create-loyalty-transaction.dto';
import { UpdateLoyaltyTransactionDto } from './dto/update-loyalty-transaction.dto';
export declare class LoyaltyTransactionsController {
    private readonly loyaltyTransactionsService;
    constructor(loyaltyTransactionsService: LoyaltyTransactionsService);
    create(createLoyaltyTransactionDto: CreateLoyaltyTransactionDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: string;
        type: string;
        customerId: string;
        transactionId: string;
        pointsEarned: number;
        pointsRedeemed: number;
    }[]>>;
    findOne(id: string): string;
    update(id: string, updateLoyaltyTransactionDto: UpdateLoyaltyTransactionDto): string;
    remove(id: string): string;
}
