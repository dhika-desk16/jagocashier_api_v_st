import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto, req: any): Promise<{
        items: {
            createdAt: Date;
            id: string;
            productId: number;
            quantity: number;
            notes: string | null;
            variantId: number | null;
            discountAmount: import("generated/prisma/runtime/library").Decimal;
            subtotal: import("generated/prisma/runtime/library").Decimal;
            unitPrice: import("generated/prisma/runtime/library").Decimal;
            transactionId: string;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: string;
        code: string;
        storeId: number;
        customerId: string | null;
        userId: number;
        status: string;
        discountAmount: import("generated/prisma/runtime/library").Decimal;
        subtotal: import("generated/prisma/runtime/library").Decimal;
        taxAmount: import("generated/prisma/runtime/library").Decimal;
        totalAmount: import("generated/prisma/runtime/library").Decimal;
        transactionDate: Date;
        shiftId: number;
    }>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        code: string;
        storeId: number;
        customerId: string | null;
        userId: number;
        status: string;
        discountAmount: import("generated/prisma/runtime/library").Decimal;
        subtotal: import("generated/prisma/runtime/library").Decimal;
        taxAmount: import("generated/prisma/runtime/library").Decimal;
        totalAmount: import("generated/prisma/runtime/library").Decimal;
        transactionDate: Date;
        shiftId: number;
    }[]>>;
    findOne(id: string): string;
    update(id: string, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: string): string;
}
