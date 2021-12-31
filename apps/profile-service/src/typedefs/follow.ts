import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Profile } from './profile';

@ObjectType({ description: 'Entity that represent a connection between 2 user' })
export class Follow {
  @Field(() => ID)
  id: string;
  @Field(() => Profile)
  target: Profile;
  @Field(() => Profile)
  follower: Profile;
}

@InputType({ description: 'Input to create a new follow entity in database' })
export class CreateFollowInput {
  @Field(() => ID)
  targetId: string;
  @Field(() => ID)
  followerId: string;
}
