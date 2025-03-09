import { Module } from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { EvidenceController } from './evidence.controller';
import { Evidence } from './entities/evidence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DangersModule } from 'src/dangers/dangers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Evidence]), DangersModule],
  controllers: [EvidenceController],
  providers: [EvidenceService],
})
export class EvidenceModule {}
