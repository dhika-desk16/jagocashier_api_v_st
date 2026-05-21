import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
export declare class PaymentMethodsController {
    private readonly paymentMethodsService;
    constructor(paymentMethodsService: PaymentMethodsService);
    create(createPaymentMethodDto: CreatePaymentMethodDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        type: string;
        configuration: import("generated/prisma/runtime/library").JsonValue | null;
    }[]>>;
    findOne(id: string): string;
    update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): string;
    remove(id: string): string;
}
