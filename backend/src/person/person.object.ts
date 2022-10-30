import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullName: string;
}
