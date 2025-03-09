import { ApiProperty } from "@nestjs/swagger";
import { Evidence } from "../entities/evidence.entity";
import { EntityIdDto } from "src/_shared/dto/entity-id.dto";

export class EvidenceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    postDate: Date;

    @ApiProperty()
    evidenceText: string;

    @ApiProperty()
    postLink: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    danger: EntityIdDto;

    constructor(evidence: Evidence) {
        this.id = evidence.id;
        this.postDate = evidence.postDate;
        this.evidenceText = evidence.evidenceText;
        this.postLink = evidence.postLink;
        this.author = evidence.author;

        if (evidence.danger) {
            this.danger = new EntityIdDto(evidence.danger?.id);
        }
    }
}