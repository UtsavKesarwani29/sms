// rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { StudentRabbitMQService } from './studentRabbitMQ.service';

@Module({
  providers: [StudentRabbitMQService],
  exports: [StudentRabbitMQService],
})
export class StudentRabbitMQModule {}


