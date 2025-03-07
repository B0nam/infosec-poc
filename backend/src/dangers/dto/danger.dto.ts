import { ApiProperty } from "@nestjs/swagger";
import { Danger } from "../entities/danger.entity";
import { Company } from "src/company/entities/company.entity";
import { Evidence } from "src/evidence/entities/evidence.entity";
import { ForumDomain } from "src/forum-domains/entities/forum-domain.entity";

export class DangerDto extends Danger {
    @ApiProperty()
    id: number;

    @ApiProperty()
    isSolved: boolean;

    @ApiProperty()
    identificationDate: Date;

    @ApiProperty()
    company: Company;

    @ApiProperty()
    forumDomain: ForumDomain;

    @ApiProperty()
    evidences: Evidence[];
}