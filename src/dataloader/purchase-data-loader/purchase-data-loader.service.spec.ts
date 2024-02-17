import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseDataLoaderService } from './purchase-data-loader.service';

describe('PurchaseDataLoaderService', () => {
  let service: PurchaseDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseDataLoaderService],
    }).compile();

    service = module.get<PurchaseDataLoaderService>(PurchaseDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
