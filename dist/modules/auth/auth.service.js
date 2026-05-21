"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        console.log('JWT OPTIONS:', this.jwtService.options);
    }
    generateAccessToken(user) {
        return this.jwtService.sign({
            sub: user.id,
            username: user.username,
            role: user.role,
        });
    }
    async generateRefreshToken(userId, deviceId) {
        const rawToken = crypto.randomUUID();
        const tokenHash = await bcrypt.hash(rawToken, 10);
        await this.prisma.refreshToken.upsert({
            where: {
                user_device_unique: {
                    userId,
                    deviceId,
                },
            },
            update: {
                tokenHash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                revokedAt: null,
            },
            create: {
                userId,
                deviceId,
                tokenHash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return rawToken;
    }
    async validateUser(username, password) {
        const user = await this.prisma.user.findUnique({
            where: { username },
            include: { role: true },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(createAuthDto) {
        try {
            const user = await this.validateUser(createAuthDto.username, createAuthDto.password);
            if (!user) {
                throw new common_1.UnauthorizedException('Username atau password salah');
            }
            const accessToken = this.generateAccessToken({
                id: user.id,
                username: user.username,
                role: {
                    id: user.role.id,
                    name: user.role.name,
                    permissions: user.role.permissions,
                },
            });
            const refreshToken = await this.issueRefreshToken(user.id, createAuthDto.deviceId);
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                user,
            };
        }
        catch (err) {
            console.error('[LOGIN][SERVICE][ERROR]', err);
            throw err;
        }
    }
    async issueRefreshToken(userId, deviceId) {
        const rawToken = crypto.randomUUID();
        const tokenHash = await bcrypt.hash(rawToken, 10);
        await this.prisma.refreshToken.upsert({
            where: {
                user_device_unique: { userId, deviceId },
            },
            update: {
                tokenHash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                revokedAt: null,
            },
            create: {
                userId,
                deviceId,
                tokenHash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return rawToken;
    }
    async refresh(refreshToken, deviceId) {
        const records = await this.prisma.refreshToken.findMany({
            where: {
                revokedAt: null,
                expiresAt: { gt: new Date() },
            },
            include: {
                user: {
                    include: { role: true },
                },
            },
        });
        const record = await Promise.all(records.map(async (r) => {
            const match = await bcrypt.compare(refreshToken, r.tokenHash);
            return match ? r : null;
        })).then((arr) => arr.find((r) => r));
        if (!record) {
            throw new common_1.UnauthorizedException('unvalid refresh token');
        }
        const newRawToken = crypto.randomUUID();
        const newHash = await bcrypt.hash(newRawToken, 10);
        await this.prisma.refreshToken.update({
            where: { id: record.id },
            data: {
                tokenHash: newHash,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                revokedAt: null,
                deviceId: deviceId,
            },
        });
        return {
            access_token: this.generateAccessToken(record.user),
            refresh_token: newRawToken,
        };
    }
    checkToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const now = Math.floor(Date.now() / 1000);
            return {
                valid: true,
                expired: false,
                issued_at: new Date(decoded.iat * 1000),
                expired_at: new Date(decoded.exp * 1000),
                remaining_seconds: decoded.exp - now,
                payload: decoded,
            };
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                return {
                    valid: false,
                    expired: true,
                    message: 'Expired token',
                };
            }
            throw new common_1.UnauthorizedException('Unvalid token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map