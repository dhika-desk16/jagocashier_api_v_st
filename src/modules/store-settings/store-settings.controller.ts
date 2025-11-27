import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoreSettingsService } from './store-settings.service';
import { CreateStoreSettingDto } from './dto/create-store-setting.dto';
import { UpdateStoreSettingDto } from './dto/update-store-setting.dto';

@Controller('store-settings')
export class StoreSettingsController {
  constructor(private readonly storeSettingsService: StoreSettingsService) {}

  @Post()
  create(@Body() createStoreSettingDto: CreateStoreSettingDto) {
    return this.storeSettingsService.create(createStoreSettingDto);
  }

  @Get()
  findAll() {
    return this.storeSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreSettingDto: UpdateStoreSettingDto) {
    return this.storeSettingsService.update(+id, updateStoreSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeSettingsService.remove(+id);
  }
}
