import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Commune {
  @PrimaryColumn()
  code: string;

  @Column({ unique: true })
  name: string;

  @Column()
  postalCode: string;
}
