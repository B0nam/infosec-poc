import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateForumDomainDto } from './dto/create-forum-domain.dto';
import { UpdateForumDomainDto } from './dto/update-forum-domain.dto';
import { ForumDomain } from './entities/forum-domain.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ForumDomainsService {
  private readonly forumDomainRepository: Repository<ForumDomain>;
  constructor(@InjectRepository(ForumDomain) forumDomainRepository: Repository<ForumDomain>) {
    this.forumDomainRepository = forumDomainRepository;
  }

  async create(createForumDomainDto: CreateForumDomainDto): Promise<ForumDomain> {
    const forumDomain: ForumDomain | null = await this.forumDomainRepository.findOne({
      where: { domain: createForumDomainDto.domain }
    });
    if (forumDomain != null) throw new BadRequestException('Domínio de fórum já cadastrado');
    const newForumDomain = this.forumDomainRepository.create(createForumDomainDto);
    return await this.forumDomainRepository.save(newForumDomain);
  }

  async findAll(): Promise<ForumDomain[]> {
    return await this.forumDomainRepository.find();
  }

  async findOne(id: number): Promise<ForumDomain> {
    const forumDomain: ForumDomain | null = await this.forumDomainRepository.findOne({
      where: { id }
    });
    if (forumDomain == null) throw new BadRequestException(`Domínio de fórum não encontrado com o id: ${id}`);
    return forumDomain;
  }

  async update(id: number, updateForumDomainDto: UpdateForumDomainDto): Promise<ForumDomain> {
    await this.findOne(id);
    await this.forumDomainRepository.update({ id }, updateForumDomainDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<ForumDomain> {
    const forumDomain: ForumDomain = await this.findOne(id);
    await this.forumDomainRepository.delete({ id });
    return forumDomain;
  }
}
