import { Test, TestingModule } from '@nestjs/testing';
import { ForumDomainsService } from './forum-domains.service';

describe('ForumDomainsService', () => {
  let service: ForumDomainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumDomainsService],
    }).compile();

    service = module.get<ForumDomainsService>(ForumDomainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
