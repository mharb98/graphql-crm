import { Test, TestingModule } from '@nestjs/testing';
import { StatusUpdateService } from './status-update.service';

describe('StatusUpdateService', () => {
  let service: StatusUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusUpdateService],
    }).compile();

    service = module.get<StatusUpdateService>(StatusUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
