import { Injectable } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class StudentSchedulerService 
{
    constructor(){}

    //@Interval(2000) // Runs every 5 seconds
    //@Cron('0 20 * * *')
    handleCron() {
        console.log("Task 2 Sec");
    }


}