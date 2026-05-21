import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class PromotionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPromotionDto: CreatePromotionDto): string;
    findAll(): import("generated/prisma").Prisma.PrismaPromise<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        code: string;
        discountType: string;
        discountValue: import("generated/prisma/runtime/library").Decimal;
        minimumPurchase: import("generated/prisma/runtime/library").Decimal | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        usageCount: number;
    }[]>;
    findOne(id: number): string;
    update(id: number, updatePromotionDto: UpdatePromotionDto): string;
    remove(id: number): string;
}
