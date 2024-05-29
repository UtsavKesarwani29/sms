import { Module } from '@nestjs/common';
import { StudentSchedulerService } from './studentScheduler.service';
 
@Module({
  imports:[],
  providers: [StudentSchedulerService],
  //exports: [StudentSchedulerService],

})
export class StudentSchedulerModule {}