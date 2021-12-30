import { UserInputError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../apollo/context';
import { CreateProfileInput, Profile } from '../typedefs/profile';

@Resolver()
export class ProfileResolver {
  @Query(() => [Profile], { nullable: 'items' })
  profiles(@Ctx() { dataSources: { profileAPI } }: Context) {
    return profileAPI.getAllProfiles();
  }

  @Query(() => Profile)
  async profile(@Arg('id') profileId: string, @Ctx() { dataSources: { profileAPI } }: Context) {
    const profile = await profileAPI.getProfileById(profileId);
    if (!profile) {
      throw new UserInputError('Profile does not exist');
    }
    return profile;
  }

  @Query(() => Profile)
  async getProfileByAuth0Id(
    @Arg('auth0Id') auth0Id: string,
    @Ctx() { dataSources: { profileAPI } }: Context
  ) {
    const profile = await profileAPI.getProfileByAuth0Id(auth0Id);
    if (!profile) {
      throw new UserInputError('Profile does not exist');
    }
    return profile;
  }

  @Mutation(() => Profile, { description: 'Create a new user profile' })
  async createProfile(
    @Arg('input') input: CreateProfileInput,
    @Ctx() { dataSources: { profileAPI } }: Context
  ) {
    console.log({ input }, 'AAAA');
    const user = await profileAPI.createProfile(input);
    return user;
  }
}
