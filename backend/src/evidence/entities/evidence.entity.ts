import { IsDate, IsString } from 'class-validator';
import { Danger } from 'src/dangers/entities/danger.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Evidence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  postDate: Date;

  @Column()
  @IsString()
  evidenceText: string;

  @Column()
  @IsString()
  postLink: string;

  @ManyToOne(() => Danger, (danger) => danger.evidences)
  @JoinColumn()
  danger: Danger;
}
