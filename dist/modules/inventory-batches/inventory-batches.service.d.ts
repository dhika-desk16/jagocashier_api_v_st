import type { Prisma } from "../../../generated/prisma/index.js";
import { PrismaService } from "../../prisma/prisma.service";
import { ReceiveBatchDto } from './dto/receive-batch.dto';
export declare class InventoryBatchesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    receive(dto: ReceiveBatchDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        costPrice: Prisma.Decimal;
        quantity: number;
        inventoryId: number;
        batchNumber: string | null;
        expiryDate: Date;
        initialQty: number;
        receivedAt: Date;
    }>>;
    consume(tx: Prisma.TransactionClient, p: {
        storeId: number;
        productId: number;
        quantity: number;
        transactionItemId: string;
    }): Promise<void>;
    findExpiring(storeId: number, days?: number): Promise<import("../../common/dto/response.dto").ResponseDto<{
        isExpired: boolean;
        daysLeft: number;
        inventory: {
            product: {
                name: string;
                id: number;
                sku: string;
            };
        };
        createdAt: Date;
        updatedAt: Date;
        id: string;
        costPrice: Prisma.Decimal;
        quantity: number;
        inventoryId: number;
        batchNumber: string | null;
        expiryDate: Date;
        initialQty: number;
        receivedAt: Date;
    }[]>>;
    writeOffExpired(storeId: number, userId: number): Promise<import("../../common/dto/response.dto").ResponseDto<{
        batches: number;
    }>>;
}
