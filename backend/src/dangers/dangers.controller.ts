import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { DangersService } from './dangers.service';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';
import { DangerDto } from './dto/danger.dto';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';

@Controller('dangers')
export class DangersController {
  constructor(private readonly dangersService: DangersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDangerDto: CreateDangerDto) {
    return this.dangersService.create(createDangerDto);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto): Promise<DangerDto> {
    const dangers = await this.dangersService.findAll(pagination);
    return dangers.map((danger) => {
      return {
        id: danger.id,
        isSolved: danger.isSolved,
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
  async findOne(@Param('id') id: string) {
    return this.dangersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() updateDangerDto: UpdateDangerDto) {
    this.dangersService.update(+id, updateDangerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    this.dangersService.remove(+id);
  }
}
