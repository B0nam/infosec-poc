import { Test, TestingModule } from '@nestjs/testing';
import { DangersController } from './dangers.controller';
import { DangersService } from './dangers.service';

describe('DangersController', () => {
  let controller: DangersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DangersController],
      providers: [DangersService],
    }).compile();

    controller = module.get<DangersController>(DangersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
