import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  dataCategory: string;

  @Column('text')
  name: string;

  @Column('int')
  recordCount: number;

  @Column('text')
  fields: string;
}
