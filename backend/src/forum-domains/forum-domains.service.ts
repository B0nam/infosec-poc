import { Injectable } from '@nestjs/common';
import { CreateForumDomainDto } from './dto/create-forum-domain.dto';
import { UpdateForumDomainDto } from './dto/update-forum-domain.dto';

@Injectable()
export class ForumDomainsService {
  create(createForumDomainDto: CreateForumDomainDto) {
    return 'This action adds a new forumDomain';
  }

  findAll() {
    return `This action returns all forumDomains`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumDomain`;
  }

  update(id: number, updateForumDomainDto: UpdateForumDomainDto) {
    return `This action updates a #${id} forumDomain`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumDomain`;
  }
}
