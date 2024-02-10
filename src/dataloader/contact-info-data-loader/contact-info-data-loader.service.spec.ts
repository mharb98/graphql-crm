import { Test, TestingModule } from '@nestjs/testing';
import { ContactInfoDataLoaderService } from './contact-info-data-loader.service';

describe('ContactInfoDataLoaderService', () => {
  let service: ContactInfoDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactInfoDataLoaderService],
    }).compile();

    service = module.get<ContactInfoDataLoaderService>(ContactInfoDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
