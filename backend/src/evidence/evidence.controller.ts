import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { UpdateEvidenceDto } from './dto/update-evidence.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/_shared/dto/pagination.dto';
import { EvidenceDto } from './dto/evidence.dto';
import { FilterEvidencesDto } from './dto/filter-evidence.dto';
import { DangersService } from 'src/dangers/dangers.service';
import { EntityIdDto } from 'src/_shared/dto/entity-id.dto';

@ApiBearerAuth()
@ApiTags('Evidences')
@Controller('evidences')
export class EvidenceController {
  constructor(
    private readonly evidenceService: EvidenceService,
    private readonly dangersService: DangersService
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: EntityIdDto })
  async create(@Body() createEvidenceDto: CreateEvidenceDto) {
    const danger = await this.dangersService.findOne(createEvidenceDto.dangerId);
    const evidence = await this.evidenceService.create(danger, createEvidenceDto);
    return new EntityIdDto(evidence.id);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'quantity', type: Number, required: false })
  @ApiQuery({ name: 'dangerId', type: Number, required: false })
  @ApiOkResponse({ type: EvidenceDto })
  async findAll(@Query() pagination: PaginationDto, @Query() filters: FilterEvidencesDto) {
    const evidences = await this.evidenceService.findAll(pagination, filters);

    return evidences.map((evidence) => {
      const evidenceDto = new EvidenceDto(evidence);
      evidenceDto.danger = {
        id: evidence.danger as unknown as any
      }
      return evidenceDto;
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: EvidenceDto })
  async findOne(@Param('id') id: number) {
    const evidence = await this.evidenceService.findOne(id);
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
