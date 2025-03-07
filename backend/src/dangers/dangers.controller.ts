import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { DangersService } from './dangers.service';
import { CreateDangerDto } from './dto/create-danger.dto';
import { UpdateDangerDto } from './dto/update-danger.dto';
import { DangerDto } from './dto/danger.dto';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Dangers')
@Controller('dangers')
export class DangersController {
  constructor(private readonly dangersService: DangersService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDangerDto: CreateDangerDto) {
    return this.dangersService.create(createDangerDto);
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
  findOne(@Param('id') id: string) {
    return this.dangersService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() updateDangerDto: UpdateDangerDto) {
    return this.dangersService.update(+id, updateDangerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.dangersService.remove(+id);
  }
}
