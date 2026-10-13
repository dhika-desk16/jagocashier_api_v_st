export declare class PaymentLineDto {
    paymentMethodId: number;
    amount: number;
    referenceNumber?: string;
    notes?: string;
}
export declare class CreatePaymentDto {
    payments: PaymentLineDto[];
    dueDate?: string;
}
