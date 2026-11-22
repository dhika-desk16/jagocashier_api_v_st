import { BadRequestException, Injectable } from '@nestjs/common';
import type { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';
import { ReceiveBatchDto } from './dto/receive-batch.dto';

const todayUtc = () => {
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
};

@Injectable()
export class InventoryBatchesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Stok masuk produk berkedaluwarsa */
  async receive(dto: ReceiveBatchDto) {
    const batch = await this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: dto.productId },
      });
      if (!product || !product.isActive) {
        throw new BadRequestException('Produk tidak tersedia');
      }
      if (!product.hasExpiry) {
        throw new BadRequestException(
          'Produk ini tidak memakai tanggal kedaluwarsa',
        );
      }

      const expiry = new Date(dto.expiryDate);
      if (expiry < todayUtc()) {
        throw new BadRequestException('Tanggal kedaluwarsa sudah lewat');
      }

      const inventory = await tx.inventory.upsert({
        where: {
          productId_storeId: {
            productId: dto.productId,
            storeId: dto.storeId,
          },
        },
        update: { quantity: { increment: dto.quantity } },
        create: {
          productId: dto.productId,
          storeId: dto.storeId,
          quantity: dto.quantity,
          minimumStock: 0,
          maximumStock: 0,
          averageCost: dto.costPrice,
        },
      });

      return tx.inventoryBatch.create({
        data: {
          inventoryId: inventory.id,
          batchNumber: dto.batchNumber ?? null,
          initialQty: dto.quantity,
          quantity: dto.quantity,
          costPrice: dto.costPrice,
          expiryDate: expiry,
        },
      });
    });

    return createResponse(batch);
  }

  /**
   * Kurangi stok saat penjualan. Dipanggil dari dalam transaksi Prisma.
   * - Produk tanpa expiry: kurangi Inventory.quantity.
   * - Produk dengan expiry: FEFO, batch kedaluwarsa dilewati.
   */
  async consume(
    tx: Prisma.TransactionClient,
    p: {
      storeId: number;
      productId: number;
      quantity: number;
      transactionItemId: string;
    },
  ) {
    const product = await tx.product.findUnique({ where: { id: p.productId } });
    if (!product) throw new BadRequestException('Produk tidak ditemukan');
    if (!product.trackInventory) return;

    const inventory = await tx.inventory.findUnique({
      where: {
        productId_storeId: { productId: p.productId, storeId: p.storeId },
      },
    });
    if (!inventory) {
      throw new BadRequestException(`Stok ${product.name} belum tersedia`);
    }

    if (!product.hasExpiry) {
      if (inventory.quantity < p.quantity) {
        throw new BadRequestException(`Stok ${product.name} tidak cukup`);
      }
      await tx.inventory.update({
        where: { id: inventory.id },
        data: { quantity: { decrement: p.quantity } },
      });
      return;
    }

    const batches = await tx.inventoryBatch.findMany({
      where: {
        inventoryId: inventory.id,
        quantity: { gt: 0 },
        expiryDate: { gte: todayUtc() },
      },
      orderBy: { expiryDate: 'asc' },
    });

    let need = p.quantity;
    for (const b of batches) {
      if (need <= 0) break;
      const take = Math.min(b.quantity, need);

      await tx.inventoryBatch.update({
        where: { id: b.id },
        data: { quantity: { decrement: take } },
      });
      await tx.transactionItemBatch.create({
        data: {
          transactionItemId: p.transactionItemId,
          batchId: b.id,
          quantity: take,
        },
      });
      need -= take;
    }

    if (need > 0) {
      throw new BadRequestException(
        `Stok ${product.name} tidak cukup (batch kedaluwarsa tidak dihitung)`,
      );
    }

    await tx.inventory.update({
      where: { id: inventory.id },
      data: { quantity: { decrement: p.quantity } },
    });
  }

  /** Batch yang akan atau sudah kedaluwarsa */
  async findExpiring(storeId: number, days = 30) {
    const limit = todayUtc();
    limit.setUTCDate(limit.getUTCDate() + days);

    const batches = await this.prisma.inventoryBatch.findMany({
      where: {
        quantity: { gt: 0 },
        expiryDate: { lte: limit },
        inventory: { storeId },
      },
      orderBy: { expiryDate: 'asc' },
      include: {
        inventory: {
          select: { product: { select: { id: true, sku: true, name: true } } },
        },
      },
    });

    const today = todayUtc();
    return createResponse(
      batches.map((b) => ({
        ...b,
        isExpired: b.expiryDate < today,
        daysLeft: Math.ceil(
          (b.expiryDate.getTime() - today.getTime()) / 86_400_000,
        ),
      })),
    );
  }

  /** Buang stok kedaluwarsa dan catat sebagai StockAdjustment */
  async writeOffExpired(storeId: number, userId: number) {
    const result = await this.prisma.$transaction(async (tx) => {
      const expired = await tx.inventoryBatch.findMany({
        where: {
          quantity: { gt: 0 },
          expiryDate: { lt: todayUtc() },
          inventory: { storeId },
        },
      });

      for (const b of expired) {
        await tx.stockAdjustment.create({
          data: {
            inventoryId: b.inventoryId,
            userId,
            quantityChange: -b.quantity,
            type: 'EXPIRED',
            reason: 'Kedaluwarsa',
            notes: `Batch ${b.batchNumber ?? b.id}`,
          },
        });
        await tx.inventory.update({
          where: { id: b.inventoryId },
          data: { quantity: { decrement: b.quantity } },
        });
        await tx.inventoryBatch.update({
          where: { id: b.id },
          data: { quantity: 0 },
        });
      }

      return { batches: expired.length };
    });

    return createResponse(result);
  }
}