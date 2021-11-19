import { Query, Resolver } from 'type-graphql';
import { Profile } from '../typedefs/profile';

@Resolver()
export class ProfileResolver {
  @Query(() => Profile)
  getProfile() {
    return { id: 1, username: 'hello' };
  }
}
