import { ApiProperty } from "@nestjs/swagger";

export class JwtTokenDto {
    @ApiProperty()
    access_token: string;
}
