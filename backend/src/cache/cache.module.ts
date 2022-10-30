import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RedisService } from 'src/redis.service';
import { CacheAsyncLocalStorageSetupMiddleware } from './cache-async-local-storage-setup.middleware';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService, RedisService],
  exports: [CacheService],
})
export class CacheModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheAsyncLocalStorageSetupMiddleware).forRoutes('*');
  }
}
