import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("Student")
export class Student {
    
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  sid: number;

  @Column()
  @ApiProperty()
  sname: string;

  @Column()
  @ApiProperty()
  sage: number;

  @Column()
  @ApiProperty()
  sgender: string;
}
