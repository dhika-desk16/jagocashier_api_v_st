import { PromotionProductsService } from './promotion-products.service';
import { CreatePromotionProductDto } from './dto/create-promotion-product.dto';
import { UpdatePromotionProductDto } from './dto/update-promotion-product.dto';
export declare class PromotionProductsController {
    private readonly promotionProductsService;
    constructor(promotionProductsService: PromotionProductsService);
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
    findOne(id: string): string;
    update(id: string, updatePromotionProductDto: UpdatePromotionProductDto): string;
    remove(id: string): string;
}
