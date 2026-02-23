import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionGuard } from 'src/common/permissions/permission.guard';
import { RequirePermissions } from 'src/common/permissions/permissions.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('products.create')
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  @Throttle({ long: {} })
  findAll() {
    return this.storesService.findAll();
  }

  @Get(':id')
  @Throttle({ long: {} })
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  @Throttle({ long: {} })
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  @Throttle({ long: {} })
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
