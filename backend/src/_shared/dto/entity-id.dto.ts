import { ApiProperty } from "@nestjs/swagger";

export class EntityIdDto {
    @ApiProperty()
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}