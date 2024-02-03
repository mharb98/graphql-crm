import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseProductResolver } from './purchase-product.resolver';

describe('PurchaseProductResolver', () => {
  let resolver: PurchaseProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseProductResolver],
    }).compile();

    resolver = module.get<PurchaseProductResolver>(PurchaseProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
