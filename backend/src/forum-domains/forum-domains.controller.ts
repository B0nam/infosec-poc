import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ForumDomainsService } from './forum-domains.service';
import { CreateForumDomainDto } from './dto/create-forum-domain.dto';
import { UpdateForumDomainDto } from './dto/update-forum-domain.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EntityIdDto } from 'src/_shared/dto/entity-id.dto';
import { ForumDomainDto } from './dto/forum-domain.dto';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';

@ApiBearerAuth()
@ApiTags('Forum Domains')
@Controller('forum-domains')
export class ForumDomainsController {
  constructor(private readonly forumDomainsService: ForumDomainsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: EntityIdDto })
  async create(@Body() createForumDomainDto: CreateForumDomainDto) {
    const forumDomain = await this.forumDomainsService.create(createForumDomainDto);
    return new EntityIdDto(forumDomain.id);
  }

  @Get()
  @ApiOkResponse({ type: [ForumDomainDto] })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'quantity', type: Number, required: false })
  async findAll(@Query() pagination: PaginationDto) {
    return await this.forumDomainsService.findAll(pagination);
  }

  @Get(':id')
  @ApiOkResponse({ type: ForumDomainDto })
  async findOne(@Param('id') id: string) {
    return await this.forumDomainsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ForumDomainDto })
  async update(@Param('id') id: string, @Body() updateForumDomainDto: UpdateForumDomainDto) {
    return await this.forumDomainsService.update(+id, updateForumDomainDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.forumDomainsService.remove(+id);
  }
}
