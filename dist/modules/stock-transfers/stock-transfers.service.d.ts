import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { UpdateStockTransferDto } from './dto/update-stock-transfer.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class StockTransfersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createStockTransferDto: CreateStockTransferDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: number;
        userId: number;
        status: string;
        notes: string | null;
        productId: number;
        quantity: number;
        sourceStoreId: number;
        destinationStoreId: number;
        completedAt: Date | null;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateStockTransferDto: UpdateStockTransferDto): string;
    remove(id: number): string;
}
