import { CreateLoyaltyTransactionDto } from './dto/create-loyalty-transaction.dto';
import { UpdateLoyaltyTransactionDto } from './dto/update-loyalty-transaction.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class LoyaltyTransactionsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateLoyaltyTransactionDto: UpdateLoyaltyTransactionDto): string;
    remove(id: number): string;
}
