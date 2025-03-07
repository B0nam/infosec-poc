import { Inject, Injectable } from '@nestjs/common';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Danger } from './entities/danger.entity';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { ForumDomainsService } from 'src/forum-domains/forum-domains.service';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';

@Injectable()
export class DangersService {
  constructor(
    @InjectRepository(Danger) private readonly dangersRepository: Repository<Danger>,
    @Inject() private readonly companiesService: CompanyService,
    @Inject() private readonly forumDomainsService: ForumDomainsService
  ) { }

  async create(createDangerDto: CreateDangerDto) {
    const company = await this.companiesService.findOne(createDangerDto.companyId);
    const forumDomain = await this.forumDomainsService.findOne(createDangerDto.forumDomainId);

    const newDanger = this.dangersRepository.create({
      isSolved: createDangerDto.isSolved,
      company,
      forumDomain,
      identificationDate: createDangerDto.identificationDate
    });

    return await this.dangersRepository.save(newDanger);
  }

  async findAll(pagination: PaginationDto) {
    return await this.dangersRepository.find({
      relations: ['company', 'forumDomain'],
      skip: (pagination.page - 1) * pagination.quantity,
      take: pagination.quantity
    });
  }

  async findOne(id: number) {
    return await this.dangersRepository.findOne(
      { where: { id }, relations: ['company', 'evidences', 'forumDomain'] }
    );
  }

  async update(id: number, updateDangerDto: UpdateDangerDto) {
    const danger = await this.findOne(id);

    danger.identificationDate = updateDangerDto.identificationDate;
    danger.isSolved = updateDangerDto.isSolved;
    danger.title = updateDangerDto.title;

    if (danger.forumDomain.id !== updateDangerDto.forumDomainId) {
      const newForumDomain = await this.forumDomainsService.findOne(updateDangerDto.forumDomainId);
      danger.forumDomain = newForumDomain;
    }

    return await this.dangersRepository.save(danger);
  }

  async remove(id: number) {
    const danger = await this.dangersRepository.findOneBy({ id });
    return await this.dangersRepository.remove(danger);
  }
}
