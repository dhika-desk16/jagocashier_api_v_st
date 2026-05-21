import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
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
    findAll(categoryId?: string, name?: string, page?: number, limit?: number): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    }[]>> | Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    }>> | Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    findProductBySku(sku: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    } | null>> | Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    findProductsByBarcode(barcode: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    }>> | Promise<import("../../common/dto/response.dto").ResponseDto<({
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
    findProductWithCategory(): Promise<import("../../common/dto/response.dto").ResponseDto<({
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
    findProductWithCategoryNoCache(): Promise<import("../../common/dto/response.dto").ResponseDto<({
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
    findVariantProduct(productId: string): Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    }>> | Promise<import("../../common/dto/response.dto").ResponseDto<{
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
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
