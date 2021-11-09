import { Directive, Field, ID, ObjectType } from 'type-graphql';

@Directive(`@key (fields: "id")`)
@ObjectType({ description: 'An account is an Auth0 user that provides authentication details' })
export class Account {
  @Field(() => ID, { description: 'The unique Auth0 ID associated with the account' })
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  createdAt: Date;
  @Field({ nullable: true })
  lastLogin: Date;
  @Field({ description: 'Whether the account has a moderator role' })
  isModerator: boolean;
  @Field({ description: 'Whether the account is blocked' })
  isBlocked: boolean;
}
