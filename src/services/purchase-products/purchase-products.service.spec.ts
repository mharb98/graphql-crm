import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseProductsService } from './purchase-products.service';

describe('PurchaseProductsService', () => {
  let service: PurchaseProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseProductsService],
    }).compile();

    service = module.get<PurchaseProductsService>(PurchaseProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
