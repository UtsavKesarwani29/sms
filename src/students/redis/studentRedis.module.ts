import { Module } from '@nestjs/common';
import { StudentRedisService } from './studentRedis.service';
 
@Module({
  providers: [StudentRedisService],
  exports: [StudentRedisService],
})
export class StudentRedisModule {}