import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentsRepository } from './repository/students.repository';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { StudentRedisService } from './redis/studentRedis.service';
import { StudentSchedulerService } from './scheduler/studentScheduler.service';
import { StudentRedisModule } from './redis/studentRedis.module';
import { StudentRabbitMQModule } from './rabbitmq/studentRabbitMQ.module';
import { StudentSchedulerModule } from './scheduler/studentScheduler.module';
import { AuthService } from './authguard/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Student],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Student,
      StudentsController,
      StudentsModule,
      StudentsService,
      StudentsRepository
    ]),
    StudentRabbitMQModule,
    JwtModule.register({
      secret : 'key',
      signOptions : {
        expiresIn : '60s'
      }
    })
  ],
  controllers: [StudentsController],
  providers: [StudentsService,StudentsRepository,StudentRedisService,AuthService],
  exports:[StudentsService]
})
export class StudentsModule {
}
