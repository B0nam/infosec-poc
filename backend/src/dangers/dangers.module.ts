import { Module } from '@nestjs/common';
import { DangersService } from './dangers.service';
import { DangersController } from './dangers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Danger } from './entities/danger.entity';
import { CompanyModule } from 'src/company/company.module';
import { ForumDomainsModule } from 'src/forum-domains/forum-domains.module';

@Module({
  imports: [TypeOrmModule.forFeature([Danger]), CompanyModule, ForumDomainsModule],
  controllers: [DangersController],
  providers: [DangersService],
  exports: [DangersService]
})
export class DangersModule {}
