import { IsString } from 'class-validator';
import { Danger } from 'src/dangers/entities/danger.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ForumDomain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  domain: string;

  @Column()
  @IsString()
  engine: string;

  @JoinColumn()
  @OneToMany(() => Danger, (danger) => danger.forumDomain)
  danger: Danger[];
}
