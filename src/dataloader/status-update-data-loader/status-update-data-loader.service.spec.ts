import { Test, TestingModule } from '@nestjs/testing';
import { StatusUpdateDataLoaderService } from './status-update-data-loader.service';

describe('StatusUpdateDataLoaderService', () => {
  let service: StatusUpdateDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusUpdateDataLoaderService],
    }).compile();

    service = module.get<StatusUpdateDataLoaderService>(StatusUpdateDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
