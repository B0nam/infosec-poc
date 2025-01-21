import { PartialType } from '@nestjs/mapped-types';
import { CreateDangerDto } from './create-danger.dto';

export class UpdateDangerDto extends PartialType(CreateDangerDto) {}
