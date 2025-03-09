import { ApiProperty } from "@nestjs/swagger";

export class ForumDomainDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  domain?: string;

  @ApiProperty()
  engine?: string;
}