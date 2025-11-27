import { Injectable } from '@nestjs/common';
import { CreateStoreSettingDto } from './dto/create-store-setting.dto';
import { UpdateStoreSettingDto } from './dto/update-store-setting.dto';

@Injectable()
export class StoreSettingsService {
  create(createStoreSettingDto: CreateStoreSettingDto) {
    return 'This action adds a new storeSetting';
  }

  findAll() {
    return `This action returns all storeSettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeSetting`;
  }

  update(id: number, updateStoreSettingDto: UpdateStoreSettingDto) {
    return `This action updates a #${id} storeSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeSetting`;
  }
}
