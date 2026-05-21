import { ProductVariantsService } from './product-variants.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
export declare class ProductVariantsController {
    private readonly productVariantsService;
    constructor(productVariantsService: ProductVariantsService);
    create(createProductVariantDto: CreateProductVariantDto): string;
    findAll(): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        type: string;
        sku: string;
        productId: number;
        priceAdjustment: import("generated/prisma/runtime/library").Decimal;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateProductVariantDto: UpdateProductVariantDto): string;
    remove(id: string): string;
}
