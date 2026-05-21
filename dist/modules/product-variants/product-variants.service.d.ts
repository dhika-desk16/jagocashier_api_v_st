import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class ProductVariantsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): string;
    update(id: number, updateProductVariantDto: UpdateProductVariantDto): string;
    remove(id: number): string;
}
