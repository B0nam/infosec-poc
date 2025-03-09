import { ApiProperty } from "@nestjs/swagger";

export class CreateEvidenceDto {
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
}
