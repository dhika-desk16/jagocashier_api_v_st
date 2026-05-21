import { StockAdjustmentsService } from './stock-adjustments.service';
import { CreateStockAdjustmentDto } from './dto/create-stock-adjustment.dto';
import { UpdateStockAdjustmentDto } from './dto/update-stock-adjustment.dto';
export declare class StockAdjustmentsController {
    private readonly stockAdjustmentsService;
    constructor(stockAdjustmentsService: StockAdjustmentsService);
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
    findOne(id: string): string;
    update(id: string, updateStockAdjustmentDto: UpdateStockAdjustmentDto): string;
    remove(id: string): string;
}
