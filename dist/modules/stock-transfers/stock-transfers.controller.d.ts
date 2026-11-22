import { StockTransfersService } from './stock-transfers.service';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { UpdateStockTransferDto } from './dto/update-stock-transfer.dto';
export declare class StockTransfersController {
    private readonly stockTransfersService;
    constructor(stockTransfersService: StockTransfersService);
    create(createStockTransferDto: CreateStockTransferDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: number;
        productId: number;
        quantity: number;
        userId: number;
        status: string;
        notes: string | null;
        sourceStoreId: number;
        destinationStoreId: number;
        completedAt: Date | null;
    }[]>>;
    findOne(id: string): string;
    update(id: string, updateStockTransferDto: UpdateStockTransferDto): string;
    remove(id: string): string;
}
