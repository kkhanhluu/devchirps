import { ContextUser } from '@devchirps/api-interface';
import { FollowDataSource } from '../datasources/followDataSource';
import { ProfileDataSource } from '../datasources/profileDataSource';

export interface Context {
  user: ContextUser;
  dataSources: {
    profileAPI: ProfileDataSource;
    followAPI: FollowDataSource;
  };
}
