import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class InventoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateInventoryDto: UpdateInventoryDto): string;
    remove(id: number): string;
}
