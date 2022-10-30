import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from './cache.service';

@Injectable()
export class CacheAsyncLocalStorageSetupMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  use(_req: Request, _res: Response, next: NextFunction) {
    this.cacheService.enterScope(next);
  }
}
