import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    domain: string;
}
