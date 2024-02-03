import { Test, TestingModule } from '@nestjs/testing';
import { InstallmentsResolver } from './installments.resolver';

describe('InstallmentsResolver', () => {
  let resolver: InstallmentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallmentsResolver],
    }).compile();

    resolver = module.get<InstallmentsResolver>(InstallmentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
