import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class PaymentMethodsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): string;
    remove(id: number): string;
}
