import { Test, TestingModule } from '@nestjs/testing';
import { DangersService } from './dangers.service';

describe('DangersService', () => {
  let service: DangersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DangersService],
    }).compile();

    service = module.get<DangersService>(DangersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
