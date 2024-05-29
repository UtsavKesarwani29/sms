import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('/create')
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log("CreateController");
    return this.studentsService.create(createStudentDto);
  }

  @Get('/getAll')
  findAll() {
    console.log("FindAllController");
    return this.studentsService.findAll();
  }

  @Get('/getOne/:id')
  findOne(@Param('id') id: number) {
    console.log("FindOneController");
    return this.studentsService.findOneByID(id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    console.log("UpdateController");
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: number) {
    console.log("DeleteController");
    return this.studentsService.remove(id);
  }
}
