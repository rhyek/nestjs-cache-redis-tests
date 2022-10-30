import { Injectable, OnModuleInit } from '@nestjs/common';
import { CacheService } from 'src/cache/cache.service';
import { permissionsUpdatedSubject } from 'src/observables/permissions-updated.subject';

@Injectable()
export class PersonRepository implements OnModuleInit {
  constructor(private readonly cacheService: CacheService) {}

  onModuleInit() {
    permissionsUpdatedSubject.subscribe({
      next: () => {
        this.cacheService.invalidatePattern('person:*');
      },
    });
  }

  find(id: string) {
    return this.cacheService.get(
      `person:${id}`,
      () => {
        console.log(`🚜 fetching person ${id} from db`);
        return {
          id,
          firstName: 'carlos',
          lastName: 'gonzalez',
        };
      },
      {
        redisTtlSeconds: 10,
      },
    );
  }
}
