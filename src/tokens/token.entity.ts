import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('token')
export class Token {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.tokens, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ nullable: false, default: false })
  revoked: boolean;
}
