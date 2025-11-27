import { Test, TestingModule } from '@nestjs/testing';
import { PromotionProductsController } from './promotion-products.controller';
import { PromotionProductsService } from './promotion-products.service';

describe('PromotionProductsController', () => {
  let controller: PromotionProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionProductsController],
      providers: [PromotionProductsService],
    }).compile();

    controller = module.get<PromotionProductsController>(PromotionProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
