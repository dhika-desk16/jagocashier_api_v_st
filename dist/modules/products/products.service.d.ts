import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        sku: string;
        categoryId: number;
        basePrice: import("generated/prisma/runtime/library").Decimal;
        costPrice: import("generated/prisma/runtime/library").Decimal;
        barcode: string | null;
        imageUrl: string | null;
        trackInventory: boolean;
    }>>;
    findAll(page?: number, limit?: number | 'all'): Promise<import("../../common/dto/response.dto").ResponseDto<{
        data: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            sku: string;
            categoryId: number;
            basePrice: import("generated/prisma/runtime/library").Decimal;
            costPrice: import("generated/prisma/runtime/library").Decimal;
            barcode: string | null;
            imageUrl: string | null;
            trackInventory: boolean;
        }[];
        meta: {
            total: number;
            mode: string;
        };
    }> | import("../../common/dto/response.dto").ResponseDto<{
        data: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            sku: string;
            categoryId: number;
            basePrice: import("generated/prisma/runtime/library").Decimal;
            costPrice: import("generated/prisma/runtime/library").Decimal;
            barcode: string | null;
            imageUrl: string | null;
            trackInventory: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>>;
    findAllCategory(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        parentId: number | null;
    }[]>>;
    findAllWithCategory(): Promise<import("../../common/dto/response.dto").ResponseDto<({
        products: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            sku: string;
            categoryId: number;
            basePrice: import("generated/prisma/runtime/library").Decimal;
            costPrice: import("generated/prisma/runtime/library").Decimal;
            barcode: string | null;
            imageUrl: string | null;
            trackInventory: boolean;
        }[];
    } & {
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        parentId: number | null;
    })[]>>;
    findByCategory(categoryId: number): Promise<import("../../common/dto/response.dto").ResponseDto<{
        productCategory: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            parentId: number | null;
        } | null;
        data: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            sku: string;
            categoryId: number;
            basePrice: import("generated/prisma/runtime/library").Decimal;
            costPrice: import("generated/prisma/runtime/library").Decimal;
            barcode: string | null;
            imageUrl: string | null;
            trackInventory: boolean;
        }[];
    }>>;
    findProductsByName(name: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        sku: string;
        categoryId: number;
        basePrice: import("generated/prisma/runtime/library").Decimal;
        costPrice: import("generated/prisma/runtime/library").Decimal;
        barcode: string | null;
        imageUrl: string | null;
        trackInventory: boolean;
    }[]>>;
    findProductBySKU(sku: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        sku: string;
        categoryId: number;
        basePrice: import("generated/prisma/runtime/library").Decimal;
        costPrice: import("generated/prisma/runtime/library").Decimal;
        barcode: string | null;
        imageUrl: string | null;
        trackInventory: boolean;
    } | null>>;
    findProductByBarcode(barcode: string): Promise<import("../../common/dto/response.dto").ResponseDto<({
        promotionProducts: ({
            promotion: {
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
            };
        } & {
            id: number;
            categoryId: number | null;
            productId: number | null;
            promotionId: number;
        })[];
    } & {
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        sku: string;
        categoryId: number;
        basePrice: import("generated/prisma/runtime/library").Decimal;
        costPrice: import("generated/prisma/runtime/library").Decimal;
        barcode: string | null;
        imageUrl: string | null;
        trackInventory: boolean;
    }) | null>>;
    findAllWithCategoryNoCache(): Promise<import("../../common/dto/response.dto").ResponseDto<({
        products: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            sku: string;
            categoryId: number;
            basePrice: import("generated/prisma/runtime/library").Decimal;
            costPrice: import("generated/prisma/runtime/library").Decimal;
            barcode: string | null;
            imageUrl: string | null;
            trackInventory: boolean;
        }[];
    } & {
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        parentId: number | null;
    })[]>>;
    findVariantProduct(productId: number): Promise<import("../../common/dto/response.dto").ResponseDto<{
        product: {
            name: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            sku: string;
            categoryId: number;
            basePrice: import("generated/prisma/runtime/library").Decimal;
            costPrice: import("generated/prisma/runtime/library").Decimal;
            barcode: string | null;
            imageUrl: string | null;
            trackInventory: boolean;
        } | null;
        productVariants: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            isActive: boolean;
            type: string;
            sku: string;
            productId: number;
            priceAdjustment: import("generated/prisma/runtime/library").Decimal;
        } | null;
    }>>;
    findOne(id: number): string;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
