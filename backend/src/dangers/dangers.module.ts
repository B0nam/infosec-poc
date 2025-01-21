import { Module } from '@nestjs/common';
import { DangersService } from './dangers.service';
import { DangersController } from './dangers.controller';

@Module({
  controllers: [DangersController],
  providers: [DangersService],
})
export class DangersModule {}
