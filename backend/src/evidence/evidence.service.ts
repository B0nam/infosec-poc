import { Injectable } from '@nestjs/common';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';

@Injectable()
export class EvidenceService {
  create(createEvidenceDto: CreateEvidenceDto) {
    return 'This action adds a new evidence';
  }

  findAll() {
    return `This action returns all evidence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} evidence`;
  }

  update(id: number, updateEvidenceDto: UpdateEvidenceDto) {
    return `This action updates a #${id} evidence`;
  }

  remove(id: number) {
    return `This action removes a #${id} evidence`;
  }
}
