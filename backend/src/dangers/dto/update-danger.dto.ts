import { ApiProperty } from "@nestjs/swagger";

export class UpdateDangerDto {
    @ApiProperty()
    forumDomainId: number;
    
    @ApiProperty()
    identificationDate: Date;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    isSolved: boolean;
};
