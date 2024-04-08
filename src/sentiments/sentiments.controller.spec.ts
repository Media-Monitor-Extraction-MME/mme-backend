import { Test, TestingModule } from '@nestjs/testing';
import { SentimentsController } from './sentiments.controller';
import { SentimentsService } from './sentiments.service';

describe('SentimentsController', () => {
  let controller: SentimentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentimentsController],
      providers: [SentimentsService],
    }).compile();

    controller = module.get<SentimentsController>(SentimentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
