import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, unique: true, nullable: false })
  name: string;

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
