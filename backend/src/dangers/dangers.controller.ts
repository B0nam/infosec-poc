import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { DangersService } from './dangers.service';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';
import { DangerDto } from './dto/danger.dto';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EntityIdDto } from 'src/_shared/dto/entity-id.dto';
import { DangerDetailsDto } from './dto/danger-details.dto';

@ApiBearerAuth()
@ApiTags('Dangers')
@Controller('dangers')
export class DangersController {
  constructor(private readonly dangersService: DangersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: EntityIdDto })
  async create(@Body() createDangerDto: CreateDangerDto) {
    const danger = await this.dangersService.create(createDangerDto);
    return new EntityIdDto(danger.id);
  }

  @Get()
  @ApiOkResponse({ type: [DangerDto] })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'quantity', type: Number, required: false })
  async findAll(@Query() pagination: PaginationDto): Promise<any> {
    const dangers = await this.dangersService.findAll(pagination);
    return dangers.map((danger) => {
      return {
        id: danger.id,
        isSolved: danger.isSolved,
        title: danger.title,
        identificationDate: danger.identificationDate,
        company: {
          id: danger.company.id,
          name: danger.company.name
        },
        forumDomain: {
          id: danger.forumDomain.id,
          domain: danger.forumDomain.domain
        }
      }
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: DangerDetailsDto })
  async findOne(@Param('id') id: string) {
    const danger = await this.dangersService.findOne(+id);
    return new DangerDetailsDto(danger);
  }

  @Patch(':id')
  @ApiOkResponse({ type: DangerDto })
  async update(@Param('id') id: string, @Body() updateDangerDto: UpdateDangerDto) {
    const danger = await this.dangersService.update(+id, updateDangerDto);
    return new DangerDto(danger);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.dangersService.remove(+id);
  }
}
