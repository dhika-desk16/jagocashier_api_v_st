import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
export declare class ProductCategoriesController {
    private readonly productCategoriesService;
    constructor(productCategoriesService: ProductCategoriesService);
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
    findOne(id: string): string;
    update(id: string, updateProductCategoryDto: UpdateProductCategoryDto): string;
    remove(id: string): string;
}
