import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Danger } from './entities/danger.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { ForumDomain } from 'src/forum-domains/entities/forum-domain.entity';

@Injectable()
export class DangersService {
  constructor(
    @InjectRepository(Danger) private readonly dangersRepository: Repository<Danger>,
    @InjectRepository(Company) private readonly companiesRepository: Repository<Company>,
    @InjectRepository(ForumDomain) private readonly forumDomainsRepository: Repository<ForumDomain>,
  ) { }

  async create(createDangerDto: CreateDangerDto) {
    const company = await this.companiesRepository.findOneBy({ id: createDangerDto.companyId });
    if (!company) {
      throw new NotFoundException("There isn't a valid company with the selected id");
    }

    const forumDomain = await this.forumDomainsRepository.findOneBy({ id: createDangerDto.forumDomainId });
    if (!forumDomain) {
      throw new NotFoundException("There isn't a valid forum domain with the selected id");
    }

    const newDanger = this.dangersRepository.create({
      isSolved: createDangerDto.isSolved,
      company,
      forumDomain,
      identificationDate: createDangerDto.identificationDate
    });

    return await this.dangersRepository.save(newDanger);
  }

  async findAll() {
    return await this.dangersRepository.find();
  }

  async findOne(id: number) {
    return await this.dangersRepository.findOneBy({ id });
  }

  async update(id: number, updateDangerDto: UpdateDangerDto) {
    const danger = await this.findOne(id);
    danger.identificationDate = updateDangerDto.identificationDate;
    danger.isSolved = updateDangerDto.isSolved;

    if (danger.forumDomain.id !== updateDangerDto.forumDomainId) {
      const newForumDomain = await this.forumDomainsRepository.findOneBy({ id: updateDangerDto.forumDomainId });
      danger.forumDomain = newForumDomain;
    }
    
    return await this.dangersRepository.save(danger);
  }

  async remove(id: number) {
    const danger = await this.dangersRepository.findOneBy({ id });
    return await this.dangersRepository.remove(danger);
  }
}
