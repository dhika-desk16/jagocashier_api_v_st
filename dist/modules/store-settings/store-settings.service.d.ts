import { CreateStoreSettingDto } from './dto/create-store-setting.dto';
import { UpdateStoreSettingDto } from './dto/update-store-setting.dto';
export declare class StoreSettingsService {
    create(createStoreSettingDto: CreateStoreSettingDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateStoreSettingDto: UpdateStoreSettingDto): string;
    remove(id: number): string;
}
