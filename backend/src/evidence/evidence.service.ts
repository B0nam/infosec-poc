import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evidence } from './entities/evidence.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvidenceService {
  constructor(@InjectRepository(Evidence) private readonly evidenceRepository: Repository<Evidence>) { }

  create(createEvidenceDto: CreateEvidenceDto): Promise<Evidence> {
    const evidence = this.evidenceRepository.create({
      author: createEvidenceDto.author,
      evidenceText: createEvidenceDto.evidenceText,
      postDate: createEvidenceDto.postDate,
      postLink: createEvidenceDto.postLink
    });

    return this.evidenceRepository.save(evidence);
  }

  findAll(page: number, quantity: number): Promise<Evidence[]> {
    return this.evidenceRepository.find({
      skip: (page - 1) * quantity,
      take: quantity
    });
  }

  async findOne(id: number): Promise<Evidence> {
    const evidence = await this.evidenceRepository.findOneBy({ id });

    if (!evidence) {
      throw new NotFoundException(`Evidence #${id} not found`);
    }

    return evidence;
  }

  async update(id: number, updateEvidenceDto: UpdateEvidenceDto): Promise<Evidence> {
    const evidence = await this.findOne(id);

    evidence.author = updateEvidenceDto.author;
    evidence.evidenceText = updateEvidenceDto.evidenceText;
    evidence.postDate = updateEvidenceDto.postDate;
    evidence.postLink = updateEvidenceDto.postLink;

    return await this.evidenceRepository.save(evidence);
  }

  async remove(id: number): Promise<Evidence> {
    const evidence = await this.findOne(id);
    return await this.evidenceRepository.remove(evidence);
  }
}
