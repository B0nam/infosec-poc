import { ApiProperty } from "@nestjs/swagger";

export class CreateDangerDto {
    @ApiProperty()
    identificationDate: Date;
    
    @ApiProperty()
    companyId: number;
    
    @ApiProperty()
    forumDomainId: number;

    @ApiProperty()
    title: string;
    
    @ApiProperty()
    isSolved: boolean;
}
