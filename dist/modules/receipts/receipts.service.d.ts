import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class ReceiptsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateReceiptDto: UpdateReceiptDto): string;
    remove(id: number): string;
}
