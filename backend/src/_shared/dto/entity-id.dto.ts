import { ApiProperty } from "@nestjs/swagger";

export class EntityIdDto {
    @ApiProperty()
    id: number;
}