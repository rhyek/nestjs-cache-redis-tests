import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  public readonly client = new Redis({ host: 'localhost', port: 6000 });
}
