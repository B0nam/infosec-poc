import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Company } from 'src/company/entities/company.entity';
import { Evidence } from 'src/evidence/entities/evidence.entity';
import { ForumDomain } from 'src/forum-domains/entities/forum-domain.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Danger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isSolved: boolean;

  @Column()
  @IsDate()
  identificationDate: Date;

  @ManyToOne(() => Company, (company) => company.dangers)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => ForumDomain, (domain) => domain.danger)
  @JoinColumn()
  forumDomain: ForumDomain;

  @OneToMany(() => Evidence, (evidence) => evidence.danger)
  @JoinColumn()
  evidences: Evidence[];
}
