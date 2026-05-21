import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class ProductCategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductCategoryDto: CreateProductCategoryDto): string;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<{
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        isActive: boolean;
        parentId: number | null;
    }[]>>;
    findOne(id: number): string;
    update(id: number, updateProductCategoryDto: UpdateProductCategoryDto): string;
    remove(id: number): string;
}
