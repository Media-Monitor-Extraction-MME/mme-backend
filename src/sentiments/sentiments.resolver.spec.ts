import { Test, TestingModule } from '@nestjs/testing';
import { SentimentsResolver } from './sentiments.resolver';

describe('SentimentsResolver', () => {
  let resolver: SentimentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentsResolver],
    }).compile();

    resolver = module.get<SentimentsResolver>(SentimentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
