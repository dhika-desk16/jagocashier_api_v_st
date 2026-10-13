import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { AuthUserInterface } from '../interfaces/auth-user.interface';
import { CloseShiftDto } from './dto/close-shift.dto';
export declare class ShiftsController {
    private readonly shiftsService;
    constructor(shiftsService: ShiftsService);
    create(createShiftDto: CreateShiftDto, req: Request & {
        user: AuthUserInterface;
    }): Promise<{
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
    closeShift(id: number, closeShiftDto: CloseShiftDto, req: Request & {
        user: AuthUserInterface;
    }): Promise<{
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
    findOne(id: string): string;
    update(id: string, updateShiftDto: UpdateShiftDto): string;
    remove(id: string): string;
}
