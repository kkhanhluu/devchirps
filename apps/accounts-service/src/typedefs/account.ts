import { Directive, Field, ID, ObjectType } from 'type-graphql';

@Directive(`@key (fields: "id")`)
@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;
  @Field()
  username: string;
  @Field()
  email: string;
}
