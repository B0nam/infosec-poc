import { ApiProperty } from "@nestjs/swagger";
import { DangerDto } from "src/dangers/dto/danger.dto";

export class ForumDomainDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  domain?: string;

  @ApiProperty()
  engine?: string;

  @ApiProperty()
  danger?: DangerDto[];
}