import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ForumDomainsService } from './forum-domains.service';
import { CreateForumDomainDto } from './dto/create-forum-domain.dto';
import { UpdateForumDomainDto } from './dto/update-forum-domain.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';

@Controller('forum-domains')
export class ForumDomainsController {
  constructor(private readonly forumDomainsService: ForumDomainsService) {}

  @Post()
  create(@Body() createForumDomainDto: CreateForumDomainDto) {
    return this.forumDomainsService.create(createForumDomainDto);
  }

  @UseGuards(AuthGuard)
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.forumDomainsService.remove(+id);
  }
}
