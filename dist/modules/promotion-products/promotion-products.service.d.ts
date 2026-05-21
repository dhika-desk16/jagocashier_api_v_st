import { CreatePromotionProductDto } from './dto/create-promotion-product.dto';
import { UpdatePromotionProductDto } from './dto/update-promotion-product.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class PromotionProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPromotionProductDto: CreatePromotionProductDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        id: number;
        categoryId: number | null;
        productId: number | null;
        promotionId: number;
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        id: number;
        categoryId: number | null;
        productId: number | null;
        promotionId: number;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updatePromotionProductDto: UpdatePromotionProductDto): string;
    remove(id: number): string;
}
