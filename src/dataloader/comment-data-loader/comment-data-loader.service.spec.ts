import { Test, TestingModule } from '@nestjs/testing';
import { CommentDataLoaderService } from './comment-data-loader.service';

describe('CommentDataLoaderService', () => {
  let service: CommentDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentDataLoaderService],
    }).compile();

    service = module.get<CommentDataLoaderService>(CommentDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
