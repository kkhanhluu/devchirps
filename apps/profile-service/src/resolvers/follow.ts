import { Arg, Ctx, ID, Mutation, Resolver } from 'type-graphql';
import { Context } from '../apollo/context';
import { CreateFollowInput, Follow } from '../typedefs/follow';

@Resolver()
export class FollowResolver {
  @Mutation(() => Follow, {
    description: 'Follow another profile. Creating a new follow entity in database',
  })
  followProfile(
    @Arg('input') input: CreateFollowInput,
    @Ctx() { dataSources: { followAPI } }: Context
  ) {
    return followAPI.createFollow(input);
  }

  @Mutation(() => ID, { description: 'Unfollow a profile. Delete the follow entity in database' })
  unfollowProfile(@Arg('id') followId: string, @Ctx() { dataSources: { followAPI } }: Context) {
    return followAPI.unfollowProfile(followId);
  }
}
