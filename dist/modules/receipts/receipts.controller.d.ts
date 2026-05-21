import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
export declare class ReceiptsController {
    private readonly receiptsService;
    constructor(receiptsService: ReceiptsService);
    create(createReceiptDto: CreateReceiptDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        number: string;
        createdAt: Date;
        id: string;
        transactionId: string;
        content: string;
        isPrinted: boolean;
        printedAt: Date | null;
    }[]>>;
    findOne(id: string): string;
    update(id: string, updateReceiptDto: UpdateReceiptDto): string;
    remove(id: string): string;
}
