import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ForumDomainsModule } from './forum-domains/forum-domains.module';
import { EvidenceModule } from './evidence/evidence.module';
import { DangersModule } from './dangers/dangers.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [CompanyModule, UserModule, DangersModule, EvidenceModule, ForumDomainsModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
