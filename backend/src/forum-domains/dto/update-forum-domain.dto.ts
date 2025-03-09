import { ApiProperty } from '@nestjs/swagger';

export class UpdateForumDomainDto {
    @ApiProperty()
    domain: string;

    @ApiProperty()
    engine: string;
}
