import { ApiProperty } from "@nestjs/swagger";

export class UpdateEvidenceDto {
    @ApiProperty()
    postDate: Date;

    @ApiProperty()
    evidenceText: string;

    @ApiProperty()
    postLink: string;

    @ApiProperty()
    author: string;
}
