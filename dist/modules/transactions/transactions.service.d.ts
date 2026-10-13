import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class TransactionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTransactionDto, id: number): Promise<{
        items: {
            createdAt: Date;
            id: string;
            notes: string | null;
            productId: number;
            quantity: number;
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
        userId: number;
        status: string;
        customerId: string | null;
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
        userId: number;
        status: string;
        customerId: string | null;
        discountAmount: import("generated/prisma/runtime/library").Decimal;
        subtotal: import("generated/prisma/runtime/library").Decimal;
        taxAmount: import("generated/prisma/runtime/library").Decimal;
        totalAmount: import("generated/prisma/runtime/library").Decimal;
        transactionDate: Date;
        shiftId: number;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): string;
}
