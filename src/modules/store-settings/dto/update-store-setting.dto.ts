import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreSettingDto } from './create-store-setting.dto';

export class UpdateStoreSettingDto extends PartialType(CreateStoreSettingDto) {}
