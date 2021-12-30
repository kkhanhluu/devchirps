import { ContextUser } from '@devchirps/api-interface';
import { ProfileDataSource } from '../datasources/profileDataSource';

export interface Context {
  user: ContextUser;
  dataSources: {
    profileAPI: ProfileDataSource;
  };
}
