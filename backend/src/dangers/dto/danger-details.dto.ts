import { ApiProperty } from "@nestjs/swagger";
import { CompanyDto } from "src/company/dto/company.dto";
import { ForumDomainDto } from "src/forum-domains/dto/forum-domain.dto";
import { Danger } from "../entities/danger.entity";

export class DangerDetailsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    isSolved: boolean;

    @ApiProperty()
    identificationDate: Date;

    @ApiProperty()
    company: CompanyDto;

    @ApiProperty()
    forumDomain: ForumDomainDto;

    constructor(danger: Danger) {
        this.id = danger.id;
        this.isSolved = danger.isSolved;
        this.identificationDate = danger.identificationDate;
        this.company = {
            id: danger.company?.id,
            name: danger.company?.name
        };
        this.forumDomain = {
            id: danger.forumDomain?.id,
            domain: danger.forumDomain?.domain
        }
    }

}