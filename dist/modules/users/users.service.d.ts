import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<import("../../common/dto/response.dto").ResponseDto<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }>>;
    findAll(): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    })[]>>;
    findOne(id: number): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }) | null>>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findByEmail(email: string): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }) | null>>;
    findByUsername(username: string): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }) | null>>;
    findById(id: number): Promise<import("../../common/dto/response.dto").ResponseDto<({
        role: {
            name: string;
            description: string;
            permissions: import("generated/prisma/runtime/library").JsonValue;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        store: {
            name: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
            address: string;
            city: string;
            phone: string;
            email: string;
            isActive: boolean;
            code: string;
        } | null;
        shifts: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            storeId: number;
            openingCash: import("generated/prisma/runtime/library").Decimal;
            closingCash: import("generated/prisma/runtime/library").Decimal | null;
            expectedCash: import("generated/prisma/runtime/library").Decimal | null;
            variance: import("generated/prisma/runtime/library").Decimal | null;
            userId: number;
            openedAt: Date;
            closedAt: Date | null;
            status: string;
            notes: string | null;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        phone: string;
        email: string;
        isActive: boolean;
        fullName: string;
        username: string;
        password: string;
        roleId: number;
        storeId: number | null;
    }) | null>>;
}
