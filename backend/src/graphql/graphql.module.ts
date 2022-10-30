import { Module } from '@nestjs/common';
import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule } from 'src/cache/cache.module';
import { PersonModule } from 'src/person/person.module';
import { LoggingPlugin } from './logging.plugin';
import { DiagnosticsModule } from 'src/diagnostics/diagnostics.module';

@Module({
  imports: [
    CacheModule,
    PersonModule,
    DiagnosticsModule,
    NestJSGraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [LoggingPlugin],
})
export class GraphQLModule {}
