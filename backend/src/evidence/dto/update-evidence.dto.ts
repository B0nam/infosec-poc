import { PartialType } from '@nestjs/mapped-types';
import { CreateEvidenceDto } from './create-evidence.dto';

export class UpdateEvidenceDto extends PartialType(CreateEvidenceDto) {}
