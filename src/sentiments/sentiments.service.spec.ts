import { Test, TestingModule } from '@nestjs/testing';
import { SentimentsService } from './sentiments.service';

describe('SentimentsService', () => {
  let service: SentimentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentimentsService],
    }).compile();

    service = module.get<SentimentsService>(SentimentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
