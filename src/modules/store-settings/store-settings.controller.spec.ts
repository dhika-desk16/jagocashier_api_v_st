import { Test, TestingModule } from '@nestjs/testing';
import { StoreSettingsController } from './store-settings.controller';
import { StoreSettingsService } from './store-settings.service';

describe('StoreSettingsController', () => {
  let controller: StoreSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreSettingsController],
      providers: [StoreSettingsService],
    }).compile();

    controller = module.get<StoreSettingsController>(StoreSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
