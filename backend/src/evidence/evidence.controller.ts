import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';
import { EvidenceDto } from './dto/evidence.dto';

@ApiBearerAuth()
@ApiTags('Evidences')
@Controller('evidences')
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: EvidenceDto })
  async create(@Body() createEvidenceDto: CreateEvidenceDto) {
    const evidence = await this.evidenceService.create(createEvidenceDto);
    return new EvidenceDto(evidence);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'quantity', type: Number, required: false })
  @ApiOkResponse({ type: EvidenceDto })
  async findAll(@Query() pagination: PaginationDto) {
    const evidences = await this.evidenceService.findAll(pagination.page, pagination.quantity);
    return evidences.map((evidence) => new EvidenceDto(evidence));
  }

  @Get(':id')
  @ApiOkResponse({ type: EvidenceDto })
  async findOne(@Param('id') id: string) {
    const evidence = await this.evidenceService.findOne(+id);
    return new EvidenceDto(evidence);
  }

  @Patch(':id')
  @ApiOkResponse({ type: EvidenceDto })
  async update(@Param('id') id: string, @Body() updateEvidenceDto: UpdateEvidenceDto) {
    const evidence = await this.evidenceService.update(+id, updateEvidenceDto);
    return new EvidenceDto(evidence);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.evidenceService.remove(+id);
  }
}
