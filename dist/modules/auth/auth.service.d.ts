import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    generateAccessToken(user: any): string;
    generateRefreshToken(userId: number, deviceId: string): Promise<`${string}-${string}-${string}-${string}-${string}`>;
    validateUser(username: string, password: string): Promise<{
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
    } | null>;
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
    issueRefreshToken(userId: number, deviceId: string): Promise<`${string}-${string}-${string}-${string}-${string}`>;
    refresh(refreshToken: string, deviceId: string): Promise<{
        access_token: string;
        refresh_token: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    checkToken(token: string): {
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
