import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseProductDataLoaderService } from './purchase-product-data-loader.service';

describe('PurchaseProductDataLoaderService', () => {
  let service: PurchaseProductDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseProductDataLoaderService],
    }).compile();

    service = module.get<PurchaseProductDataLoaderService>(PurchaseProductDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
