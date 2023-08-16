import { Test, TestingModule } from '@nestjs/testing';
import { WsBotService } from './ws-bot.service';

describe('WsBotService', () => {
  let service: WsBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsBotService],
    }).compile();

    service = module.get<WsBotService>(WsBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
