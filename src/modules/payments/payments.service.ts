import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Prisma } from 'generated/prisma';

const Decimal = Prisma.Decimal;

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(transactionId: string, dto: CreatePaymentDto) {
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT id FROM transactions WHERE id = ${transactionId} FOR UPDATE`;

      const trx = await tx.transaction.findUnique({
        where: { id: transactionId },
        include: { receivable: true },
      });

      if (!trx) throw new NotFoundException('Transaksi tidak ditemukan');
      if (trx.status === 'PAID' || trx.status === 'CANCELLED') {
        throw new ConflictException(`Transaksi sudah ${trx.status}`);
      }

      const agg = await tx.payment.aggregate({
        where: { transactionId, status: 'SUCCESS' },
        _sum: { amount: true },
      });

      let remaining = trx.totalAmount.minus(agg._sum.amount ?? 0);
      if (remaining.lte(0)) throw new ConflictException('Tagihan sudah lunas');

      let change = new Decimal(0);
      const now = new Date();

      for (const line of dto.payments) {
        const method = await tx.paymentMethod.findUnique({
          where: { id: line.paymentMethodId },
        });
        if (!method || !method.isActive) {
          throw new BadRequestException(
            `Metode pembayaran ${line.paymentMethodId} tidak tersedia`,
          );
        }
        if (remaining.lte(0)) {
          throw new BadRequestException(
            'Tagihan sudah terbayar penuh, hapus baris pembayaran berlebih',
          );
        }

        const given = new Decimal(line.amount);
        const isCash = method.type === 'CASH';

        if (!isCash && given.gt(remaining)) {
          throw new BadRequestException(
            `Nominal ${method.name} melebihi sisa tagihan`,
          );
        }

        const applied = given.gt(remaining) ? remaining : given;
        const lineChange = given.minus(applied);

        remaining = remaining.minus(applied);
        change = change.plus(lineChange);

        await tx.payment.create({
          data: {
            transactionId,
            paymentMethodId: method.id,
            amount: applied,
            status: 'SUCCESS',
            referenceNumber: line.referenceNumber ?? null,
            paymentDate: now,
            notes: lineChange.gt(0)
              ? `Diterima ${given.toFixed(0)}, kembalian ${lineChange.toFixed(0)}`
              : (line.notes ?? null),
          },
        });
      }

      const paid = trx.totalAmount.minus(remaining);
      let status: string;

      if (remaining.lte(0)) {
        status = 'PAID';
        if (trx.receivable) {
          await tx.receivable.update({
            where: { id: trx.receivable.id },
            data: { amountDue: new Decimal(0), status: 'PAID' },
          });
        }
      } else {
        if (!trx.customerId) {
          throw new BadRequestException(
            'Pembayaran kurang. Pilih pelanggan untuk mencatat piutang',
          );
        }

        status = paid.gt(0) ? 'PARTIAL' : 'PENDING';

        if (trx.receivable) {
          await tx.receivable.update({
            where: { id: trx.receivable.id },
            data: {
              amountDue: remaining,
              ...(dto.dueDate && { dueDate: new Date(dto.dueDate) }),
            },
          });
        } else {
          if (!dto.dueDate) {
            throw new BadRequestException(
              'dueDate wajib diisi untuk piutang baru',
            );
          }
          await tx.receivable.create({
            data: {
              transactionId,
              customerId: trx.customerId,
              amountDue: remaining,
              dueDate: new Date(dto.dueDate),
            },
          });
        }
      }

      await tx.transaction.update({
        where: { id: transactionId },
        data: { status },
      });

      return {
        transactionId,
        status,
        totalAmount: trx.totalAmount,
        paid,
        remaining,
        change,
      };
    });

    return createResponse(result);
  }

  async findAll() {
    const payments = await this.prisma.payment.findMany();
    return createResponse(payments);
  }
}
