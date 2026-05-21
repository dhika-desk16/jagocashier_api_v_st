export declare class CreateProductDto {
    sku: string;
    name: string;
    description?: string;
    categoryId: number;
    basePrice: number;
    costPrice: number;
    barcode?: string;
    imageUrl?: string;
    isActive?: boolean;
    trackInventory?: boolean;
}
