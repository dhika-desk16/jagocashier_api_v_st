import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PrismaService } from "../../prisma/prisma.service";
import { AuthUserInterface } from '../interfaces/auth-user.interface';
export declare class ShiftsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createShiftDto: CreateShiftDto, user: AuthUserInterface): Promise<{
        message: string;
        data: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            storeId: number;
            userId: number;
            openingCash: import("generated/prisma/runtime/library").Decimal;
            closingCash: import("generated/prisma/runtime/library").Decimal | null;
            expectedCash: import("generated/prisma/runtime/library").Decimal | null;
            variance: import("generated/prisma/runtime/library").Decimal | null;
            openedAt: Date;
            closedAt: Date | null;
            status: string;
            notes: string | null;
        };
    }>;
    closeShift(id: number, closeShiftDto: any, user: AuthUserInterface): Promise<{
        message: string;
        data: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            storeId: number;
            userId: number;
            openingCash: import("generated/prisma/runtime/library").Decimal;
            closingCash: import("generated/prisma/runtime/library").Decimal | null;
            expectedCash: import("generated/prisma/runtime/library").Decimal | null;
            variance: import("generated/prisma/runtime/library").Decimal | null;
            openedAt: Date;
            closedAt: Date | null;
            status: string;
            notes: string | null;
        };
    }>;
    findAll(): import("generated/prisma").Prisma.PrismaPromise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        storeId: number;
        userId: number;
        openingCash: import("generated/prisma/runtime/library").Decimal;
        closingCash: import("generated/prisma/runtime/library").Decimal | null;
        expectedCash: import("generated/prisma/runtime/library").Decimal | null;
        variance: import("generated/prisma/runtime/library").Decimal | null;
        openedAt: Date;
        closedAt: Date | null;
        status: string;
        notes: string | null;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateShiftDto: UpdateShiftDto): string;
    remove(id: number): string;
}
