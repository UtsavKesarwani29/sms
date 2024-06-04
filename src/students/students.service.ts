import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import {v4 as uuidv4} from 'uuid';
import { DeleteResult} from 'typeorm';
import { StudentsRepository } from './repository/students.repository';
import { StudentRabbitMQService } from './rabbitmq/studentRabbitMQ.service';
import { User } from './entities/users.entity';


@Injectable()
export class StudentsService {

  constructor(
    private readonly studentRepo:StudentsRepository,
    private readonly studentRabbitMQService: StudentRabbitMQService
    ) {}

    public users : User[]=[
      {
        email:'utsav1@gmail.com',
        password:'Utsav1',
        username:'Utsav1',
        role:'ADMIN'
      },
      {
        email:'utsav2@gmail.com',
        password:'Utsav2',
        username:'Utsav2',
        role:'USER'
      }
    ]

    getUserByUserName(username:string):User{
      return this.users.find((user)=>user.username===username);
    }

  //CREATE
  async create(createStudentDto: CreateStudentDto) : Promise<Student> {

    let student:Student={
      sid: 0,
      sname: '',
      sage: 0,
      sgender: ''
    };

      student.sid=uuidv4(),
      student.sname=createStudentDto.sname,
      student.sage=createStudentDto.sage,
      student.sgender=createStudentDto.sgender

    console.log(student);
    console.log(createStudentDto);
    console.log("CreateService");
    //Rabbitmq
    await this.studentRabbitMQService.sendWelcomeMessage(`Welcome, ${student.sname}!`);

    await this.studentRabbitMQService.consumeQueue();

    return this.studentRepo.create(student);
  }
  
  //FIND_ALL
  findAll() : Promise<Student[]>{

    console.log("FindAllService");
    return this.studentRepo.findAll();
  }

  //FIND_ONE
  findOneByID(id: number) :  Promise<Student>  {
    
    console.log("FindOneService");
    return this.studentRepo.findOneByID(id);

  }

  //UPDATE 
  update(id: number, updateStudentDto: UpdateStudentDto) : Promise<Student>{

    console.log("UpdateService");
    return this.studentRepo.update(id,updateStudentDto);

  }

  //REMOVE
  remove(id: number) : Promise<DeleteResult> {

    console.log("RemoveService");
    return this.studentRepo.remove(id);
  }
}
