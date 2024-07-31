import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  hashedPassword: string;

  @Column('text')
  salt: string;

  @Column('text', { unique: true })
  username: string;
}
