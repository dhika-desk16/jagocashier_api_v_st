import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
export declare class PromotionsController {
    private readonly promotionsService;
    constructor(promotionsService: PromotionsService);
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
    findOne(id: string): string;
    update(id: string, updatePromotionDto: UpdatePromotionDto): string;
    remove(id: string): string;
}
