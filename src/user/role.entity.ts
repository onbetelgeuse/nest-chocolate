import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('role')
export class Role {
  @PrimaryColumn()
  name: string;

  @ManyToMany(type => User, user => user.roles)
  users: User[];
}
