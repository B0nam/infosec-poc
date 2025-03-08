import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EntityIdDto } from 'src/_shared/dto/entity-id.dto';
import { CompanyDto } from './dto/company.dto';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: EntityIdDto })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.create(createCompanyDto);
    return new EntityIdDto(company.id);
  }

  @Get()
  @ApiOkResponse({ type: [CompanyDto] })
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CompanyDto })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CompanyDto })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.companyService.remove(+id);
  }
}
