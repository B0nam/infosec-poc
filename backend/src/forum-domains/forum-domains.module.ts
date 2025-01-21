import { Module } from '@nestjs/common';
import { ForumDomainsService } from './forum-domains.service';
import { ForumDomainsController } from './forum-domains.controller';

@Module({
  controllers: [ForumDomainsController],
  providers: [ForumDomainsService],
})
export class ForumDomainsModule {}
