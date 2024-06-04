import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StudentRabbitMQService } from './students/rabbitmq/studentRabbitMQ.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rabbitMQService = app.get(StudentRabbitMQService);
  await rabbitMQService.init();

  const options = new DocumentBuilder()
      .setTitle('Student Management System')
      .setDescription('CRUD Operation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
