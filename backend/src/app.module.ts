import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForumDomainsModule } from './forum-domains/forum-domains.module';
import { EvidenceModule } from './evidence/evidence.module';
import { DangersModule } from './dangers/dangers.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { CompanyModule } from './company/company.module';
import { Evidence } from './evidence/entities/evidence.entity';
import { User } from './user/entities/user.entity';
import { ForumDomain } from './forum-domains/entities/forum-domain.entity';
import { Danger } from './dangers/entities/danger.entity';
import { Company } from './company/entities/company.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Senha123!',
      database: 'infosec',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      entities: [Evidence, ForumDomain, User, Danger, Company],
    }),
CompanyModule, UserModule, DangersModule, EvidenceModule, ForumDomainsModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
