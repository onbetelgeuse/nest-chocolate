import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('token')
export class Token {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  audience: string;

  @ManyToOne(type => User, user => user.tokens, { nullable: false })
  user: number;

  @Column({ nullable: false })
  accessToken: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ nullable: false, default: false })
  isRevoked: boolean;
}
