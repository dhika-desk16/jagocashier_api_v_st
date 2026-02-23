import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshToken } from 'generated/prisma';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  generateAccessToken(user: any) {
    return this.jwtService.sign(
      {
        sub: user.id,
        username: user.username,
        role: user.role,
      },
      { expiresIn: '10m' },
    );
  }

  async generateRefreshToken(userId: number, deviceId: string) {
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

  async validateUser(username: string, password: string) {
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

  async login(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.validateUser(
        createAuthDto.username,
        createAuthDto.password,
      );

      if (!user) {
        throw new UnauthorizedException('Username atau password salah');
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

      const refreshToken = await this.issueRefreshToken(
        user.id,
        createAuthDto.deviceId,
      );

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user,
      };
    } catch (err) {
      console.error('[LOGIN][SERVICE][ERROR]', err);
      throw err;
    }
  }

  async issueRefreshToken(userId: number, deviceId: string) {
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

  async refresh(refreshToken: string, deviceId: string) {
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

    const record = await Promise.all(
      records.map(async (r) => {
        const match = await bcrypt.compare(refreshToken, r.tokenHash);
        return match ? r : null;
      }),
    ).then((arr) => arr.find((r) => r));

    if (!record) {
      throw new UnauthorizedException('unvalid refresh token');
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

  checkToken(token: string) {
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
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return {
          valid: false,
          expired: true,
          message: 'Expired token',
        };
      }

      throw new UnauthorizedException('Unvalid token');
    }
  }
}
