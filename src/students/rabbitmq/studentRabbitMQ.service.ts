// rabbitmq.service.ts
import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

@Injectable()
export class StudentRabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async init() {
    this.connection = await connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
  }

  async sendWelcomeMessage(message: string) {
    //console.log("Rabbit:",message);
    const result = await this.channel.assertQueue('welcome_queue');
    this.channel.sendToQueue('welcome_queue', Buffer.from(message));
    //console.log("Result:",result);
  }

  async consumeQueue() {
    //await this.channel.assertQueue('welcome_queue');
    
    this.channel.consume('welcome_queue', (msg) => {
      if (msg !== null) {
        console.log('Message received:', msg.content.toString());
        this.channel.ack(msg);
      }
    });

    

    //console.log('Consuming messages from welcome_queue...');
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
