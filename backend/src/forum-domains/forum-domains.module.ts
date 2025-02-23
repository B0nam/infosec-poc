import { Module } from '@nestjs/common';
import { ForumDomainsService } from './forum-domains.service';
import { ForumDomainsController } from './forum-domains.controller';
import { ForumDomain } from './entities/forum-domain.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ForumDomain])],
  controllers: [ForumDomainsController],
  providers: [ForumDomainsService],
})
export class ForumDomainsModule {}
