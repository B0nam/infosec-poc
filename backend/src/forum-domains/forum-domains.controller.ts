import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumDomainsService } from './forum-domains.service';
import { CreateForumDomainDto } from './dto/create-forum-domain.dto';
import { UpdateForumDomainDto } from './dto/update-forum-domain.dto';

@Controller('forum-domains')
export class ForumDomainsController {
  constructor(private readonly forumDomainsService: ForumDomainsService) {}

  @Post()
  create(@Body() createForumDomainDto: CreateForumDomainDto) {
    return this.forumDomainsService.create(createForumDomainDto);
  }

  @Get()
  findAll() {
    return this.forumDomainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumDomainsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumDomainDto: UpdateForumDomainDto) {
    return this.forumDomainsService.update(+id, updateForumDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumDomainsService.remove(+id);
  }
}
