import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionItemPayload } from '../interfaces/TransactionItemPayload.interface';
import { createResponse } from 'src/common/dto/response.helper';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransactionDto, id: number) {
    return this.prisma.$transaction(async (tx) => {
      try {
        const user = await tx.user.findUnique({
          where: { id },
          include: {
            store: true,
            shifts: {
              where: {
                status: 'OPEN',
              },
              orderBy: {
                openedAt: 'desc',
              },
              take: 1,
            },
          },
        });

        if (!user) {
          throw new BadRequestException('User tidak ditemukan');
        }

        const activeShift = user.shifts[0];

        if (!activeShift) {
          throw new ConflictException('Tidak ada shift aktif');
        }

        const transactionCode = `TRX-${Date.now()}`;

        const itemsPayload: TransactionItemPayload[] = [];

        let subtotal = new Decimal(0);

        for (const item of dto.items) {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });

          if (!product || !product.isActive) {
            throw new BadRequestException(
              `Product ${item.productId} tidak tersedia`,
            );
          }

          let unitPrice = product.basePrice;

          if (item.variantId) {
            const variant = await tx.productVariant.findUnique({
              where: { id: item.variantId },
            });

            if (!variant || !variant.isActive) {
              throw new BadRequestException(
                `Variant ${item.variantId} tidak tersedia`,
              );
            }

            unitPrice = unitPrice.plus(variant.priceAdjustment);
          }

          const qty = new Decimal(item.quantity);
          const price = new Decimal(unitPrice);
          const discount = new Decimal(item.discountAmount ?? 0);

          const itemSubtotal = price.mul(qty).minus(discount);

          if (itemSubtotal.lessThan(0)) {
            throw new BadRequestException('Subtotal item tidak valid');
          }

          subtotal = subtotal.plus(itemSubtotal);

          itemsPayload.push({
            productId: item.productId,
            variantId: item.variantId ?? null,
            quantity: item.quantity,
            unitPrice: price,
            discountAmount: discount,
            subtotal: itemSubtotal,
            notes: item.notes,
          });
        }

        const taxRate = new Decimal(dto.taxRate ?? 0);
        const taxAmount = subtotal.mul(taxRate);
        const totalAmount = subtotal.plus(taxAmount);

        const transaction = await tx.transaction.create({
          data: {
            code: transactionCode,

            storeId: user.storeId!,
            shiftId: activeShift.id,
            userId: user.id,

            customerId: dto.customerId ?? null,

            subtotal,
            discountAmount: new Decimal(0),
            taxAmount,
            totalAmount,

            status: 'PAID',
            transactionDate: new Date(),

            items: {
              create: itemsPayload.map((item) => ({
                ...item,
              })),
            },
          },
          include: {
            items: true,
          },
        });

        return transaction;
      } catch (err: any) {
        console.error('PRISMA ERROR RAW:', err);
        console.error('PRISMA ERROR MESSAGE:', err?.message);
        console.error('PRISMA ERROR META:', err?.meta);
        throw err;
      }
    });
  }

  async findAll() {
    const transaction = await this.prisma.transaction.findMany();
    return createResponse(transaction);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
