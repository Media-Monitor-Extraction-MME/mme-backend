import { Test, TestingModule } from '@nestjs/testing';
import { MentionsResolver } from './mentions.resolver';

describe('MentionsResolver', () => {
  let resolver: MentionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentionsResolver],
    }).compile();

    resolver = module.get<MentionsResolver>(MentionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
