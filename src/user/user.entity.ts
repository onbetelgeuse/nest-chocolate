import { Injectable } from '@nestjs/common';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { AuthUtil } from '../auth/auth.util';
import { Role } from './role.entity';
import { TokenSession } from '../token-session/token-session.entity';
import { File } from '../documents/document.entity';
@Injectable()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ length: 200, unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 200, unique: true })
  @IsString()
  username: string;

  @Column()
  @IsString()
  private password: string;

  @Column({ length: 200 })
  @IsString()
  @MaxLength(200)
  firstName: string;

  @Column({ length: 200 })
  @MaxLength(200)
  lastName: string;

  @Column({ length: 200, unique: true, nullable: true })
  @MaxLength(200)
  externalId?: string;

  @Column({ default: true })
  @IsBoolean()
  active: boolean;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  @OneToMany(type => TokenSession, token => token.user)
  tokens: TokenSession[];

  public setPassword(password: string) {
    if (password) {
      this.password = AuthUtil.generatePassword(password);
    } else {
      this.password = undefined;
    }
  }

  public verifyPassword(data: string): boolean {
    return AuthUtil.verifyPassword(data, this.password);
  }

  @OneToMany(type => File, file => file.user)
  files: File[];
}
