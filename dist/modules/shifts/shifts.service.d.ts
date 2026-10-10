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
            openingCash: import("generated/prisma/runtime/library").Decimal;
            closingCash: import("generated/prisma/runtime/library").Decimal | null;
            expectedCash: import("generated/prisma/runtime/library").Decimal | null;
            variance: import("generated/prisma/runtime/library").Decimal | null;
            openedAt: Date;
            closedAt: Date | null;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            storeId: number;
            userId: number;
        };
    }>;
    closeShift(id: number, closeShiftDto: any, user: AuthUserInterface): Promise<{
        message: string;
        data: {
            openingCash: import("generated/prisma/runtime/library").Decimal;
            closingCash: import("generated/prisma/runtime/library").Decimal | null;
            expectedCash: import("generated/prisma/runtime/library").Decimal | null;
            variance: import("generated/prisma/runtime/library").Decimal | null;
            openedAt: Date;
            closedAt: Date | null;
            status: string;
            notes: string | null;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            storeId: number;
            userId: number;
        };
    }>;
    findAll(): import("generated/prisma").Prisma.PrismaPromise<{
        openingCash: import("generated/prisma/runtime/library").Decimal;
        closingCash: import("generated/prisma/runtime/library").Decimal | null;
        expectedCash: import("generated/prisma/runtime/library").Decimal | null;
        variance: import("generated/prisma/runtime/library").Decimal | null;
        openedAt: Date;
        closedAt: Date | null;
        status: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        storeId: number;
        userId: number;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateShiftDto: UpdateShiftDto): string;
    remove(id: number): string;
}
