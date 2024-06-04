import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/users.entity";



@Injectable()
export class AuthService{
    constructor(private readonly jwtService : JwtService){

    }

    generateToken(payload : User) : string{
        return this.jwtService.sign(payload);
    }
}