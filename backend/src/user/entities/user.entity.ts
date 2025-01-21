import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Company } from "src/company/entities/company.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @IsStrongPassword()
    password: string;

    @ManyToOne(() => Company, (company) => company.id)
    @JoinColumn()
    company: Company;
}
