import { StoreSettingsService } from './store-settings.service';
import { CreateStoreSettingDto } from './dto/create-store-setting.dto';
import { UpdateStoreSettingDto } from './dto/update-store-setting.dto';
export declare class StoreSettingsController {
    private readonly storeSettingsService;
    constructor(storeSettingsService: StoreSettingsService);
    create(createStoreSettingDto: CreateStoreSettingDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateStoreSettingDto: UpdateStoreSettingDto): string;
    remove(id: string): string;
}
