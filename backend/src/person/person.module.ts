import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { PersonRepository } from 'src/person/person.repository';
import { PersonResolver } from 'src/person/person.resolver';

@Module({
  imports: [CacheModule],
  providers: [PersonRepository, PersonResolver],
  exports: [PersonResolver],
})
export class PersonModule {}
