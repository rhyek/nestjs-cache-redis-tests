/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { RedisService } from 'src/redis.service';

@Injectable()
export class CacheService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<
    Record<string, any>
  >();

  private readonly enableRedis = true;

  constructor(private readonly redisService: RedisService) {}

  enterScope(cb: () => any) {
    console.log('entering cache scope');
    this.asyncLocalStorage.run({}, cb);
  }

  async get<T>(
    key: string,
    getter: () => T | Promise<T>,
    options?: {
      redisTtlSeconds?: number;
    },
  ): Promise<T> {
    const { redisTtlSeconds = null } = options ?? {};
    const enableRedis = this.enableRedis && redisTtlSeconds !== null;
    const store = this.asyncLocalStorage.getStore();
    if (!store) {
      throw new Error('store not defined');
    }
    let value = (store[key] ?? null) as T | null;
    if (value === null) {
      console.log('❌ memory');
      let setInRedis = false;
      if (enableRedis) {
        const rawValue = await this.redisService.client.get(key);
        if (rawValue === null) {
          console.log('❌ redis');
          setInRedis = true;
        } else {
          console.log('✅ redis');
          value = JSON.parse(rawValue);
        }
      }
      if (value === null) {
        value = await getter();
      }
      if (value !== null) {
        // only save if not null
        if (setInRedis) {
          await this.redisService.client.setex(
            key,
            redisTtlSeconds!,
            JSON.stringify(value),
          );
        }
        store[key] = value;
      }
    } else {
      console.log('✅ memory');
    }
    return value;
  }

  async invalidatePattern(pattern: string) {
    const keys = await this.redisService.client.keys(pattern);
    console.log('keys', keys);
    if (keys.length > 0) {
      const nDeleted = await this.redisService.client.del(keys);
      console.log(`deleted ${nDeleted} keys`);
    }
  }
}
