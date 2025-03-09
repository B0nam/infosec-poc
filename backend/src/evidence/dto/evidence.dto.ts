import { ApiProperty } from "@nestjs/swagger";
import { Evidence } from "../entities/evidence.entity";

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
    dangerId: number;

    constructor(evidence: Evidence) {
        this.id = evidence.id;
        this.postDate = evidence.postDate;
        this.evidenceText = evidence.evidenceText;
        this.postLink = evidence.postLink;
        this.author = evidence.author;
        this.dangerId = evidence.danger?.id;
    }
}