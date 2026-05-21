export declare class CreateTransactionDto {
    customerId?: string;
    taxRate?: number;
    items: TransactionItemDto[];
}
declare class TransactionItemDto {
    productId: number;
    variantId?: number;
    quantity: number;
    discountAmount?: number;
    notes?: string;
}
export {};
