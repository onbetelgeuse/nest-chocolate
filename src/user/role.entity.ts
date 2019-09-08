import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNumber, IsString } from 'class-validator';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ length: 200, unique: true, nullable: false })
  @IsString()
  name: string;
}
