import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {

  @ApiProperty()
  sname: string;

  @ApiProperty()
  sage: number;

  @ApiProperty()
  sgender: string;
  
}
