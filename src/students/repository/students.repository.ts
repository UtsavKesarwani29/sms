import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "../entities/student.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateStudentDto } from "../dto/create-student.dto";
import {v4 as uuidv4} from 'uuid';
import { UpdateStudentDto } from "../dto/update-student.dto";
import { StudentRedisService } from "../redis/studentRedis.service";

@Injectable()
export class StudentsRepository {

  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private studentRedisService:StudentRedisService
  ) {}

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
    const newStudent = this.studentRepository.create(student);
    console.log("CreateRepository");
    return this.studentRepository.save(newStudent);
  }
  
  //FIND_ALL
  findAll() : Promise<Student[]>{

    console.log("FindAllRepository");
    return this.studentRepository.find();
  }

  //FIND_ONE
  async findOneByID(id: number) :  Promise<Student>  {
    
    console.log("FindOneRepository");
    let student= await this.studentRedisService.get(String(id));
    console.log("student1",student);
    if(!student)
    {
      console.log("studentif2",student);
      student= await this.studentRepository.findOne({ where: { sid: id } });
      await this.studentRedisService.set(String(id),student);
    }
    return student;
  }

  //UPDATE 
  async update(id: number, updateStudentDto: UpdateStudentDto) : Promise<Student>{

    await this.studentRepository.update(id, updateStudentDto);
    console.log("UpdateRepository");
    return this.studentRepository.findOne({ where: { sid: id } });

  }

  //REMOVE
  async remove(id: number) : Promise<DeleteResult> {

    console.log("RemoveRepository");
    await this.studentRedisService.deleteKey(String(id));
    return await this.studentRepository.delete(id);
  }
}