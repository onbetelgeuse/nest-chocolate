import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class File {
  @PrimaryColumn({ name: 'id' })
  public filename: string;
  @Column()
  public fieldname: string;
  @Column()
  public originalname: string;
  @Column()
  public encoding: string;
  @Column()
  public mimetype: string;
  @Column()
  public destination: string;
  @Column()
  public path: string;
  @Column()
  public size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, user => user.files, { nullable: false })
  @JoinColumn()
  user: User;
}
