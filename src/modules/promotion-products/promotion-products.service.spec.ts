import { Test, TestingModule } from '@nestjs/testing';
import { PromotionProductsService } from './promotion-products.service';

describe('PromotionProductsService', () => {
  let service: PromotionProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionProductsService],
    }).compile();

    service = module.get<PromotionProductsService>(PromotionProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
