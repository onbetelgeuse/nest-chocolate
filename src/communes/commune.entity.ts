import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['code', 'name'])
export class Commune {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  postalCode: string;
}
