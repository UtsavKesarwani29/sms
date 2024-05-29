import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StudentSchedulerModule } from './students/scheduler/studentScheduler.module';

@Module({
  imports: [StudentsModule,
    ScheduleModule.forRoot(),
    //StudentRabbitMQModule,
    StudentSchedulerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
