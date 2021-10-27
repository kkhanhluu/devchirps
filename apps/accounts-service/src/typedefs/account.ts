import { Directive, Field, ID, ObjectType } from 'type-graphql';

@Directive(`@key (fields: "id")`)
@ObjectType()
export class Account {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  lastLogin: Date;
}
