import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { EntityIdDto } from "src/_shared/dto/entity-id.dto";

export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    company?: EntityIdDto;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.company = {
            id: user.company?.id
        };
    }
}