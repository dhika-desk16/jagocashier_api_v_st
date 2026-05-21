import { CreateStockAdjustmentDto } from './dto/create-stock-adjustment.dto';
import { UpdateStockAdjustmentDto } from './dto/update-stock-adjustment.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class StockAdjustmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createStockAdjustmentDto: CreateStockAdjustmentDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: number;
        type: string;
        userId: number;
        notes: string | null;
        inventoryId: number;
        quantityChange: number;
        reason: string;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateStockAdjustmentDto: UpdateStockAdjustmentDto): string;
    remove(id: number): string;
}
