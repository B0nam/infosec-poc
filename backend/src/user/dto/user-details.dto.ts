import { ApiProperty } from "@nestjs/swagger";
import { CompanyDto } from "src/company/dto/company.dto";
import { User } from "../entities/user.entity";

export class UserDetailsDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    company?: CompanyDto;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.company = {
            id: user.company.id,
            name: user.company.name,
            domain: user.company.domain
        };
    }
}