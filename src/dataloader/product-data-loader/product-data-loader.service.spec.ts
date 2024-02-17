import { Test, TestingModule } from '@nestjs/testing';
import { ProductDataLoaderService } from './product-data-loader.service';

describe('ProductDataLoaderService', () => {
  let service: ProductDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDataLoaderService],
    }).compile();

    service = module.get<ProductDataLoaderService>(ProductDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
