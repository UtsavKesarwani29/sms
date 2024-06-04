import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentsService } from '../students.service';
import { User } from '../entities/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly studentsService: StudentsService) {
    super();
  }
  validate(username: string, password: string): User {
    const user : User = this.studentsService.getUserByUserName(username);
    if(user != undefined && user.password == password){
      return user;
    }else{
      throw new UnauthorizedException();
    }
  }
}
