import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StudentRabbitMQService } from './students/rabbitmq/studentRabbitMQ.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rabbitMQService = app.get(StudentRabbitMQService);
  await rabbitMQService.init();

  await app.listen(3001);
}
bootstrap();
