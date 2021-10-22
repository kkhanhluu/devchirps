import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New account data' })
export class CreateAccountInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
