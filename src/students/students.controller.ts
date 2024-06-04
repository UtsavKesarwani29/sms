import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, UseGuards, Request } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Student } from './entities/student.entity';
import { AuthService } from './authguard/auth.service';
import { RoleGuard } from './authguard/role.guard';
import { UserDto } from './dto/user.dto';

@ApiTags('example')
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req,@Body() userDto : UserDto) : string{
    console.log('User',req.user);
    return this.authService.generateToken(req.user);
  }



  @Post('/create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'),new RoleGuard(['ADMIN']))
  @ApiResponse({ status: 200, type: Student })
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log("CreateController");
    return this.studentsService.create(createStudentDto);
  }

  @Get('/getAll')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'),new RoleGuard(['ADMIN',]))
  findAll() {
    //console.log("FindAllController");
    return this.studentsService.findAll();
  }

  @Get('/getOne/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'),new RoleGuard(['ADMIN','USER']))
  @ApiResponse({ status: 200, type: Student })
  findOne(@Param('id') id: number) {
    //console.log("FindOneController");
    return this.studentsService.findOneByID(id);
  }

  @Patch('/update/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Student })
  @UseGuards(AuthGuard('jwt'),new RoleGuard(['ADMIN']))
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    console.log("UpdateController");
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'),new RoleGuard(['ADMIN']))
  remove(@Param('id') id: number) {
    console.log("DeleteController");
    return this.studentsService.remove(id);
  }
}
