import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentDataLoaderService } from './installment-data-loader.service';

describe('InstallmentDataLoaderService', () => {
  let service: InstallmentDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallmentDataLoaderService],
    }).compile();

    service = module.get<InstallmentDataLoaderService>(InstallmentDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
