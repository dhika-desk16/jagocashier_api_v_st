import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: number;
        storeId: number;
        productId: number;
        quantity: number;
        minimumStock: number;
        maximumStock: number;
        averageCost: import("generated/prisma/runtime/library").Decimal;
        lastUpdated: Date;
    }[]>>;
    findOne(id: string): string;
    update(id: string, updateInventoryDto: UpdateInventoryDto): string;
    remove(id: string): string;
}
