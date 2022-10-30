import { Mutation, Resolver } from '@nestjs/graphql';
import { permissionsUpdatedSubject } from 'src/observables/permissions-updated.subject';

@Resolver()
export class DiagnosticsResolver {
  @Mutation(() => Boolean)
  triggerPermissionsUpdated() {
    permissionsUpdatedSubject.next(null);
    return true;
  }
}
