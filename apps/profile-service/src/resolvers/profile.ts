import { UserInputError } from 'apollo-server-express';
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../apollo/context';
import { CreateProfileInput, Profile, UpdateProfileInput } from '../typedefs/profile';

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
  createProfile(
    @Arg('input') input: CreateProfileInput,
    @Ctx() { dataSources: { profileAPI } }: Context
  ) {
    return profileAPI.createProfile(input);
  }

  @Mutation(() => Profile, { description: 'Update an existing profile' })
  updateProfile(
    @Arg('input') input: UpdateProfileInput,
    @Ctx() { dataSources: { profileAPI } }: Context
  ) {
    return profileAPI.updateProfile(input);
  }

  @Mutation(() => ID, { description: 'Delete a profile' })
  deleteProfile(@Arg('id') profileId: string, @Ctx() { dataSources: { profileAPI } }: Context) {
    return profileAPI.deleteProfile(profileId);
  }

  // TODO: add checkViewerFollowsProfile (Chapter 5)
}
