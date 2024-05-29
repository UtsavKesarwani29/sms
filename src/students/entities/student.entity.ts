import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Student")
export class Student {
    
  @PrimaryGeneratedColumn('uuid')
  sid: number;

  @Column()
  sname: string;

  @Column()
  sage: number;

  @Column()
  sgender: string;
}
