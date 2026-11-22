import { InventoryBatchesService } from './inventory-batches.service';
import { ReceiveBatchDto } from './dto/receive-batch.dto';
export declare class InventoryBatchesController {
    private readonly service;
    constructor(service: InventoryBatchesService);
    receive(dto: ReceiveBatchDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: string;
        costPrice: import("generated/prisma/runtime/library").Decimal;
        quantity: number;
        inventoryId: number;
        batchNumber: string | null;
        expiryDate: Date;
        initialQty: number;
        receivedAt: Date;
    }>>;
    expiring(storeId: string, days?: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
        costPrice: import("generated/prisma/runtime/library").Decimal;
        quantity: number;
        inventoryId: number;
        batchNumber: string | null;
        expiryDate: Date;
        initialQty: number;
        receivedAt: Date;
    }[]>>;
    writeOff(storeId: number, req: any): Promise<import("../../common/dto/response.dto").ResponseDto<{
        batches: number;
    }>>;
}
