import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Profile in devchirps database' })
export class Profile {
  @Field(() => ID)
  id: string;
  @Field()
  username: string;
}
