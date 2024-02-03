import { Test, TestingModule } from '@nestjs/testing';
import { StatusUpdateResolver } from './status-update.resolver';

describe('StatusUpdateResolver', () => {
  let resolver: StatusUpdateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusUpdateResolver],
    }).compile();

    resolver = module.get<StatusUpdateResolver>(StatusUpdateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
