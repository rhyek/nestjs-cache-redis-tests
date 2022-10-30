import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Person } from './person.object';
import { PersonRepository } from './person.repository';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personRepository: PersonRepository) {}

  @Query(() => Person)
  async person(@Args('id') id: string) {
    console.log('gql:', 'person query');
    return this.personRepository.find(id);
  }

  @ResolveField(() => String)
  async fullName(@Parent() { id }: Person): Promise<string> {
    console.log('gql:', 'fullName field');
    // intentionally not using @Parent so we can test per-request in-memory cache
    const person = await this.personRepository.find(id);
    return `${person.firstName} ${person.lastName}`;
  }
}
