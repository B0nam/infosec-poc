import { Test, TestingModule } from '@nestjs/testing';
import { ForumDomainsController } from './forum-domains.controller';
import { ForumDomainsService } from './forum-domains.service';

describe('ForumDomainsController', () => {
  let controller: ForumDomainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumDomainsController],
      providers: [ForumDomainsService],
    }).compile();

    controller = module.get<ForumDomainsController>(ForumDomainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
