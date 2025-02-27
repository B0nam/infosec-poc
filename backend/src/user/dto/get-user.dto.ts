import { User } from "../entities/user.entity";

export class GetUserDto {
    id: number;
    email: string;
    username: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
    }
}