import { IsString } from 'class-validator';
import { Danger } from 'src/dangers/entities/danger.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  domain: string;

  @OneToMany(() => User, (user) => user.id)
  @JoinColumn()
  users: User[];

  @OneToMany(() => Danger, (dangers) => dangers.id)
  @JoinColumn()
  dangers: Danger[];
}
