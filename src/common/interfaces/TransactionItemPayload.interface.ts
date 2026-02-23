import { Decimal } from 'generated/prisma/runtime/library';

interface TransactionItemPayload {
  id: string;
  productId: number;
  variantId: number | null;
  quantity: number;
  unitPrice: Decimal;
  discountAmount: Decimal;
  subtotal: Decimal;
  notes?: string;
}
