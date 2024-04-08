import { Test, TestingModule } from '@nestjs/testing';
import { SubRedditsService } from './sub-reddits.service';

describe('SubRedditsService', () => {
  let service: SubRedditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubRedditsService],
    }).compile();

    service = module.get<SubRedditsService>(SubRedditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
