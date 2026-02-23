import { Decimal } from 'generated/prisma/runtime/library';

export interface TransactionItemPayload {
  productId: number;
  variantId: number | null;
  quantity: number;
  unitPrice: Decimal;
  discountAmount: Decimal;
  subtotal: Decimal;
  notes?: string;
}
