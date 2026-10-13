import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(transactionId: string, dto: CreatePaymentDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        transactionId: string;
        status: string;
        totalAmount: import("generated/prisma/runtime/library").Decimal;
        paid: import("generated/prisma/runtime/library").Decimal;
        remaining: import("generated/prisma/runtime/library").Decimal;
        change: import("generated/prisma/runtime/library").Decimal;
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        id: string;
        status: string;
        notes: string | null;
        transactionId: string;
        paymentMethodId: number;
        amount: import("generated/prisma/runtime/library").Decimal;
        referenceNumber: string | null;
        paymentDate: Date;
    }[]>>;
}
