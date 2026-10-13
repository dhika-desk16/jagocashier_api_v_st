import { PrismaService } from "../../prisma/prisma.service";
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Prisma } from "../../../generated/prisma/index.js";
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(transactionId: string, dto: CreatePaymentDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        transactionId: string;
        status: string;
        totalAmount: Prisma.Decimal;
        paid: Prisma.Decimal;
        remaining: Prisma.Decimal;
        change: Prisma.Decimal;
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: string;
        status: string;
        notes: string | null;
        transactionId: string;
        paymentMethodId: number;
        amount: Prisma.Decimal;
        referenceNumber: string | null;
        paymentDate: Date;
    }[]>>;
}
