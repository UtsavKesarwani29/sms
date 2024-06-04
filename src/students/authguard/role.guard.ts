import { CanActivate, ExecutionContext } from "@nestjs/common";

export class RoleGuard implements CanActivate{

    private rolePassed : string[];

    constructor(role : string[]){
        this.rolePassed=role;
    }
    canActivate(context: ExecutionContext): boolean {
        const cxt = context.switchToHttp();
        const request : any =cxt.getRequest<Request>();

        if(this.rolePassed.find((role)=>role==request.user.role)){
            return true;
        }else{
            return false;
        }
        
    }
    
}