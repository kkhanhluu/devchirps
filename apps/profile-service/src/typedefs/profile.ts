import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Follow } from './follow';

@ObjectType({ description: 'Profile in devchirps database' })
export class Profile {
  @Field(() => ID)
  id: string;
  @Field({})
  userName: string;
  @Field()
  auth0AccountId: string;
  @Field()
  avatar: string;
  @Field()
  description?: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field(() => [Follow], { nullable: 'items' })
  follows: Follow[];
  @Field(() => [Follow], { nullable: 'items' })
  followers: Follow[];
}

@InputType({ description: 'Provides data to create a new user profile' })
export class CreateProfileInput {
  @Field()
  auth0AccountId: string;
  @Field()
  avatar: string;
  @Field()
  firstName: string;
  @Field()
  userName: string;
  @Field()
  lastName: string;
  @Field()
  description?: string;
}

@InputType({ description: 'Provides data to update an existing profile' })
export class UpdateProfileInput {
  @Field(() => ID)
  id: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  userName: string;
  @Field()
  description?: string;
}
