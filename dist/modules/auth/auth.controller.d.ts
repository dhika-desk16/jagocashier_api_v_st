import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    login(createAuthDto: CreateAuthDto): Promise<{
        access_token: string;
        refresh_token: `${string}-${string}-${string}-${string}-${string}`;
        user: {
            role: {
                name: string;
                description: string;
                permissions: import("generated/prisma/runtime/library").JsonValue;
                createdAt: Date;
                updatedAt: Date;
                id: number;
            };
            createdAt: Date;
            updatedAt: Date;
            id: number;
            phone: string;
            email: string;
            isActive: boolean;
            fullName: string;
            username: string;
            roleId: number;
            storeId: number | null;
        };
    }>;
    refresh(refreshToken: string, deviceId: string): Promise<{
        access_token: string;
        refresh_token: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    getProfile(req: any): Promise<import("../../common/dto/response.dto").ResponseDto<({
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
    checkToken(req: any): {
        valid: boolean;
        expired: boolean;
        issued_at: Date;
        expired_at: Date;
        remaining_seconds: number;
        payload: any;
        message?: undefined;
    } | {
        valid: boolean;
        expired: boolean;
        message: string;
        issued_at?: undefined;
        expired_at?: undefined;
        remaining_seconds?: undefined;
        payload?: undefined;
    };
}
