import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  UseGuards,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Public } from './public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Throttle({ short: {} })
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Public()
  @Throttle({ short: {} })
  @Post('refresh')
  refresh(
    @Body('refreshToken') refreshToken: string,
    @Headers('x-device-id') deviceId: string,
  ) {
    if (!deviceId) {
      throw new BadRequestException('Device ID is required');
    }

    return this.authService.refresh(refreshToken, deviceId);
  }

  @Get('profile')
  @Throttle({ medium: {} })
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Get('check-token')
  @Throttle({ short: {} })
  @UseGuards(JwtAuthGuard)
  checkToken(@Req() req) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    return this.authService.checkToken(token);
  }

  // @Post('logout')
  // @UseGuards(JwtAuthGuard)
  // async logout(@Req() req) {
  //   await this.prisma.refreshToken.updateMany({
  //     where: {
  //       userId: req.user.userId,
  //       revoked: false,
  //     },
  //     data: { revoked: true },
  //   });

  //   return { message: 'Logout berhasil' };
  // }
}
