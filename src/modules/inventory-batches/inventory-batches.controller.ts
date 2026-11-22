import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionGuard } from 'src/common/permissions/permission.guard';
import { InventoryBatchesService } from './inventory-batches.service';
import { ReceiveBatchDto } from './dto/receive-batch.dto';

@Controller('inventory-batches')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class InventoryBatchesController {
  constructor(private readonly service: InventoryBatchesService) {}

  @Post()
  receive(@Body() dto: ReceiveBatchDto) {
    return this.service.receive(dto);
  }

  @Get('expiring')
  expiring(@Query('storeId') storeId: string, @Query('days') days?: string) {
    return this.service.findExpiring(+storeId, days ? +days : 30);
  }

  @Post('write-off-expired')
  writeOff(@Body('storeId') storeId: number, @Req() req) {
    return this.service.writeOffExpired(storeId, req.user.userId);
  }
}
