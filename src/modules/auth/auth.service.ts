import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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
    const user = await this.validateUser(
      createAuthDto.username,
      createAuthDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  // async login(createAuthDto: CreateAuthDto) {
  //   const user = await this.validateUser(
  //     createAuthDto.username,
  //     createAuthDto.password,
  //   );

  //   if (!user) {
  //     throw new UnauthorizedException('Username atau password salah');
  //   }

  //   const payload = {
  //     sub: user.id,
  //     username: user.username,
  //     role: user.role.name,
  //   };

  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user,
  //   };
  // }
}
