// redis.service.ts

import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentRedisService {
  private readonly redis: Redis.Redis;

  constructor() {
    this.redis = new Redis.default();
  }

  async set(key: string, value: any): Promise<void> {
    console.log("SetRedis");
    console.log("key: ",key)
    console.log("value: ",value)
    let res = await this.redis.set(key, JSON.stringify(value));
    console.log("res: ",res)
  }

  async get(key: string): Promise<any> {
    console.log("GetRedisBefore");
    const value =await this.redis.get(key);
    console.log("val: ",value)
    if(value===null){
        console.log("valueif"+value)
        return false
    }
    return JSON.parse(value); 
       
  }



  async deleteKey(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
