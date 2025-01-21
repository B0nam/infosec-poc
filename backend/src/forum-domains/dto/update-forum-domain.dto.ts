import { PartialType } from '@nestjs/mapped-types';
import { CreateForumDomainDto } from './create-forum-domain.dto';

export class UpdateForumDomainDto extends PartialType(CreateForumDomainDto) {}
